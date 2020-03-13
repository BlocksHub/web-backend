"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const economy = require("../models/v1/economy");
const catalog = require("../models/v1/catalog");
const _init_1 = require("./_init");
class EconomyDAL extends _init_1.default {
    async unlockUserEconomy(userId) {
        await this.knex('users').update({
            'economy_lock': 0
        }).where({
            'id': userId,
        });
    }
    async lockUserEconomy(userId) {
        try {
            await this.knex.transaction(async (trx) => {
                let lockStatus = await trx('users').select('economy_lock', 'economy_lock_date').where({
                    'id': userId,
                }).forUpdate('users');
                let info = lockStatus[0];
                console.log('user lock status', info);
                if (info.economy_lock === 1) {
                    let lockDateBad = this.moment(info.economy_lock_date).add(10, 'seconds').isSameOrAfter(this.moment());
                    console.log(lockDateBad);
                    if (lockDateBad) {
                        throw new Error("CouldNotAquireLockDueToLockNotExpired");
                    }
                }
                let dateToLock = this.knexTime();
                let results = await trx('users').update({
                    'economy_lock': 1,
                    'economy_lock_date': dateToLock,
                }).where({
                    'id': userId,
                });
                console.log(results);
                let newStatus = await trx('users').select('economy_lock', 'economy_lock_date').where({
                    'id': userId,
                }).forUpdate('users');
                console.log(newStatus);
                console.log(dateToLock);
                let timeLockedAt = newStatus[0]['economy_lock_date'].toISOString();
                let dateWeLockedAt = new Date(dateToLock).toISOString();
                console.log(newStatus);
                console.log(dateToLock);
                if (timeLockedAt !== dateWeLockedAt) {
                    throw new Error('EconomyLockedByOtherProcess');
                }
                try {
                    await trx.commit();
                }
                catch (e) {
                    throw e;
                }
            });
        }
        catch (e) {
            throw e;
        }
    }
    async deleteTransaction(transactionId) {
        await this.knex('transactions').delete().where({
            id: transactionId,
        });
    }
    async createTransaction(userIdTo, userIdFrom, amount, currency, type, description, fromType, toType, catalogId, userInventoryId) {
        let numericCatalogId;
        if (!catalogId) {
            numericCatalogId = 0;
        }
        else {
            numericCatalogId = catalogId;
        }
        let numericInventoryId;
        if (userInventoryId === undefined) {
            numericInventoryId = null;
        }
        else {
            numericInventoryId = userInventoryId;
        }
        let results = await this.knex("transactions").insert({ "userid_to": userIdTo, "userid_from": userIdFrom, "amount": amount, "currency": currency, "type": type, "description": description, "catalogid": numericCatalogId, "user_inventoryid": numericInventoryId, "from_type": fromType, "to_type": toType });
        return results[0];
    }
    async addToUserBalance(userId, amount, currency) {
        await this.knex.transaction(async (trx) => {
            if (currency === economy.currencyType.primary) {
                const balance = await trx("users").select("user_balance1").where({ "id": userId }).forUpdate('users');
                if (balance && balance[0] && balance[0]["user_balance1"] !== undefined) {
                    const currentBalance = balance[0]["user_balance1"];
                    const newBalance = currentBalance + amount;
                    await trx("users").update({ "user_balance1": newBalance }).where({ "id": userId });
                }
                else {
                    throw economy.userBalanceErrors.InvalidUserId;
                }
            }
            else if (currency === economy.currencyType.secondary) {
                const balance = await trx("users").select("user_balance2").where({ "id": userId }).forUpdate('users');
                if (balance && balance[0] && balance[0]["user_balance2"] !== undefined) {
                    const currentBalance = balance[0]["user_balance2"];
                    const newBalance = currentBalance + amount;
                    await trx("users").update({ "user_balance2": newBalance }).where({ "id": userId });
                }
                else {
                    throw economy.userBalanceErrors.InvalidUserId;
                }
            }
            else {
                throw economy.userBalanceErrors.InvalidCurrencyType;
            }
            await trx.commit();
        });
    }
    async subtractFromUserBalance(userId, amount, currency) {
        await this.knex.transaction(async (trx) => {
            if (currency === economy.currencyType.primary) {
                const balance = await trx("users").select("user_balance1").where({ "id": userId }).forUpdate('users');
                if (balance && balance[0] && balance[0]["user_balance1"] !== undefined) {
                    const currentBalance = balance[0]["user_balance1"];
                    const newBalance = currentBalance - amount;
                    if (newBalance < 0) {
                        throw economy.userBalanceErrors.NotEnoughCurrency;
                    }
                    await trx("users").update({ "user_balance1": newBalance }).where({ "id": userId });
                }
                else {
                    throw economy.userBalanceErrors.InvalidUserId;
                }
            }
            else if (currency === economy.currencyType.secondary) {
                const balance = await trx("users").select("user_balance2").where({ "id": userId }).forUpdate('users');
                if (balance && balance[0] && balance[0]["user_balance2"] !== undefined) {
                    const currentBalance = balance[0]["user_balance2"];
                    const newBalance = currentBalance - amount;
                    if (newBalance < 0) {
                        throw economy.userBalanceErrors.NotEnoughCurrency;
                    }
                    await trx("users").update({ "user_balance2": newBalance }).where({ "id": userId });
                }
                else {
                    throw economy.userBalanceErrors.InvalidUserId;
                }
            }
            else {
                throw economy.userBalanceErrors.InvalidCurrencyType;
            }
            await trx.commit();
        });
    }
    async addToGroupBalance(groupId, amount, currency) {
        await this.knex.transaction(async (trx) => {
            if (currency === economy.currencyType.primary) {
                const balance = await trx("groups").select("balance_one").where({ "id": groupId }).forUpdate('groups');
                if (balance && balance[0] && balance[0]["balance_one"] !== undefined) {
                    const currentBalance = balance[0]["balance_one"];
                    const newBalance = currentBalance + amount;
                    await trx("groups").update({ "balance_one": newBalance }).where({ "id": groupId });
                }
                else {
                    throw economy.userBalanceErrors.InvalidUserId;
                }
            }
            else if (currency === economy.currencyType.secondary) {
                const balance = await trx("groups").select("balance_two").where({ "id": groupId }).forUpdate('groups');
                if (balance && balance[0] && balance[0]["balance_two"] !== undefined) {
                    const currentBalance = balance[0]["balance_two"];
                    const newBalance = currentBalance + amount;
                    await trx("groups").update({ "balance_two": newBalance }).where({ "id": groupId });
                }
                else {
                    throw economy.userBalanceErrors.InvalidUserId;
                }
            }
            else {
                throw economy.userBalanceErrors.InvalidCurrencyType;
            }
            await trx.commit();
        });
    }
    async subtractFromGroupBalance(groupId, amount, currency) {
        await this.knex.transaction(async (trx) => {
            if (currency === economy.currencyType.primary) {
                const balance = await trx("groups").select("balance_one").where({ "id": groupId }).forUpdate('groups');
                if (balance && balance[0] && balance[0]["balance_one"] !== undefined) {
                    const currentBalance = balance[0]["balance_one"];
                    const newBalance = currentBalance - amount;
                    if (newBalance < 0) {
                        throw economy.userBalanceErrors.NotEnoughCurrency;
                    }
                    await trx("groups").update({ "balance_one": newBalance }).where({ "id": groupId });
                }
                else {
                    throw economy.userBalanceErrors.InvalidUserId;
                }
            }
            else if (currency === economy.currencyType.secondary) {
                const balance = await trx("groups").select("balance_two").where({ "id": groupId }).forUpdate('groups');
                if (balance && balance[0] && balance[0]["balance_two"] !== undefined) {
                    const currentBalance = balance[0]["balance_two"];
                    const newBalance = currentBalance - amount;
                    if (newBalance < 0) {
                        throw economy.userBalanceErrors.NotEnoughCurrency;
                    }
                    await trx("groups").update({ "balance_two": newBalance }).where({ "id": groupId });
                }
                else {
                    throw economy.userBalanceErrors.InvalidUserId;
                }
            }
            else {
                throw economy.userBalanceErrors.InvalidCurrencyType;
            }
            await trx.commit();
        });
    }
    async getUserTransactions(userId, offset) {
        const results = await this.knex("transactions").select("id as transactionId", "userid_from as userId", "amount", "currency", "date", "type as transactionType", "description", "catalogid as catalogId", "user_inventoryid as userInventoryId").limit(25).offset(offset).orderBy('id', 'desc').where({ "userid_to": userId, "to_type": catalog.creatorType.User });
        return results;
    }
    async getGroupTransactions(groupId, offset) {
        const results = await this.knex("transactions").select("id as transactionId", "userid_from as userId", "amount", "currency", "date", "type as transactionType", "description", "catalogid as catalogId", "user_inventoryid as userInventoryId").limit(25).offset(offset).orderBy('id', 'desc').where({ "userid_to": groupId, "to_type": catalog.creatorType.Group });
        return results;
    }
    async convertCurrency(amount, currency) {
        if (currency === economy.currencyType.primary) {
            const newAmt = amount / 10;
            return Math.abs(newAmt);
        }
        else if (currency === economy.currencyType.secondary) {
            return amount * 10;
        }
        else {
            throw false;
        }
    }
    async createTrade(userIdOne, userIdTwo) {
        const tradeData = await this.knex("trades").insert({
            'userid_one': userIdOne,
            'userid_two': userIdTwo,
            'status': economy.tradeStatus.Pending,
        });
        if (!tradeData[0]) {
            throw false;
        }
        return tradeData[0];
    }
    async addItemsToTrade(tradeId, side, items) {
        for (const item of items) {
            await this.knex("trade_items").insert({
                'trade_id': tradeId,
                'userinventory_id': item.userInventoryId,
                'catalog_id': item.catalogId,
                'side': side,
            });
        }
    }
    async countPendingTradesBetweenUsers(userIdOne, userIdTwo) {
        const pending = await this.knex("trades").count("id as Total").where({ "userid_one": userIdOne, "userid_two": userIdTwo, "status": economy.tradeStatus.Pending }).orWhere({ "userid_two": userIdOne, "userid_one": userIdTwo, "status": economy.tradeStatus.Pending });
        return pending[0]["Total"];
    }
    async getTrades(userId, tradeType, offset) {
        let tradeNumber;
        let query;
        if (tradeType !== 'inbound') {
            if (tradeType === 'outbound') {
                tradeNumber = 0;
                query = await this.knex("trades").where({ 'userid_one': userId, "status": tradeNumber }).select('id as tradeId', 'userid_two as userId', 'date').limit(25).offset(offset).orderBy("id", "DESC");
            }
            else if (tradeType === 'inactive') {
                tradeNumber = 2;
                const selectionOfTrades = await this.knex("trades").where({ 'userid_two': userId, "status": tradeNumber }).orWhere({ 'userid_one': userId, "status": tradeNumber }).select('id as tradeId', 'userid_one', 'userid_two', 'date').limit(25).offset(offset).orderBy("id", "DESC");
                query = [];
                for (const trade of selectionOfTrades) {
                    if (trade.userid_one === userId) {
                        query.push({
                            'tradeId': trade.tradeId,
                            'userId': trade.userid_two,
                            'date': trade.date,
                        });
                    }
                    else {
                        query.push({
                            'tradeId': trade.tradeId,
                            'userId': trade.userid_one,
                            'date': trade.date,
                        });
                    }
                }
            }
            else {
                tradeNumber = 1;
                const selectionOfTrades = await this.knex("trades").where({ 'userid_one': userId, "status": tradeNumber }).orWhere({ 'userid_two': userId, "status": tradeNumber }).select('id as tradeId', 'userid_two', 'userid_one', 'date').limit(25).offset(offset).orderBy("id", "DESC");
                query = [];
                for (const trade of selectionOfTrades) {
                    if (trade.userid_one === userId) {
                        query.push({
                            'tradeId': trade.tradeId,
                            'userId': trade.userid_two,
                            'date': trade.date,
                        });
                    }
                    else {
                        query.push({
                            'tradeId': trade.tradeId,
                            'userId': trade.userid_one,
                            'date': trade.date,
                        });
                    }
                }
            }
        }
        else {
            tradeNumber = 0;
            query = await this.knex("trades").where({ 'userid_two': userId, "status": tradeNumber }).select('id as tradeId', 'userid_one as userId', 'date').limit(25).offset(offset).orderBy("id", "DESC");
        }
        return query;
    }
    async getTradeById(tradeId) {
        const query = await this.knex("trades").select('id as tradeId', 'userid_one as userIdOne', 'userid_two as userIdTwo', 'date', 'status').where({ 'id': tradeId });
        if (!query[0]) {
            throw false;
        }
        return query[0];
    }
    async declineTradeById(tradeId) {
        await this.knex("trades").update({
            'status': economy.tradeStatus.Declined,
        }).where({
            'id': tradeId,
        }).limit(1);
    }
    async markTradeAccepted(tradeId) {
        await this.knex("trades").update({
            'status': economy.tradeStatus.Accepted,
        }).where({
            'id': tradeId,
        }).limit(1);
    }
    async getTradeItems(side, tradeId) {
        const items = await this.knex("trade_items").select("trade_id as tradeId", "userinventory_id as userInventoryId", "catalog_id as catalogId").where({ "trade_id": tradeId, "side": side });
        if (!items[0]) {
            throw false;
        }
        return items;
    }
}
exports.default = EconomyDAL;

