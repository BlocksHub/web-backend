/**
 * Imports
 */
import * as groups from '../models/v1/group';
import * as catalog from '../models/v1/catalog';
import _init from './_init';
import { group } from '../models/models';
import Knex = require('knex');

class GroupsDAL extends _init {
    /**
     * Format a Roleset DB result to make more sense
     * @param roleSetData 
     */
    private formatRoleset(roleSetData: any): groups.roleInfo {
        return {
            roleSetId: roleSetData.roleSetId,
            name: roleSetData.name,
            description: roleSetData.description,
            groupId: roleSetData.groupId,
            rank: roleSetData.rank,
            permissions: {
                getWall: roleSetData.getWall,
                postWall: roleSetData.postWall,
                getShout: roleSetData.getShout,
                postShout: roleSetData.postShout,
                manage: roleSetData.manage,
            }
        } as groups.roleInfo;
    }
    /**
     * Get a Group's Info
     */
    public async getInfo(groupId: number): Promise<groups.groupDetails> {
        const info = await this.knex("groups").select("groups.id as groupId","groups.name as groupName","groups.description as groupDescription","groups.owner_userid as groupOwnerUserId","groups.membercount as groupMemberCount","groups.thumbnail_catalogid as groupIconCatalogId","groups.status as groupStatus", 'groups.approval_required as groupMembershipApprovalRequired').where({"groups.id":groupId}).limit(1);
        if (!info[0]) {
            throw false;
        }
        return info[0] as groups.groupDetails;
    }

    /**
     * Get Group Names from an Array of IDs
     * @param ids Array of IDs
     */
    public async MultiGetNamesFromIds(ids: Array<number>): Promise<Array<groups.MultiGetNames>> {
        const query = this.knex('groups').select('name as groupName','id as groupId');
        ids.forEach((id) => {
            query.orWhere({'groups.id':id});
        });
        const usernames = await query;
        return usernames as Array<groups.MultiGetNames>;
    }
    /**
     * Get a RoleSetID's Info by it's ID
     * @param roleSetId 
     */
    public async getRoleById(roleSetId: number): Promise<groups.roleInfo> {
        const rolesetInfo = await this.knex("group_roles").select("id as roleSetId","name","description","groupid as groupId", "rank", "permission_get_wall as getWall", "permission_post_wall as postWall", "permission_get_shout as getShout","permission_post_shout as postShout", "permission_manage_group as manage").where({"id": roleSetId});
        // If role doesn't exist
        if (!rolesetInfo[0]) {
            throw false;
        }
        // Otherwise return info
        return this.formatRoleset(rolesetInfo[0]);
    }

    /**
     * Get a Group's Roleset ID from it's rank
     * @param groupId 
     * @param rank 
     */
    public async getRoleSetByRank(groupId: number, rank: number): Promise<groups.roleInfo> {
        const role = await this.knex("group_roles").select("id as roleSetId","name","description","groupid as groupId", "rank", "permission_get_wall as getWall", "permission_post_wall as postWall", "permission_get_shout as getShout","permission_post_shout as postShout", "permission_manage_group as manage").where({"groupid":groupId,"rank":rank});
        if (!role[0]) {
            throw new Error('InvalidRankOrGroupId');
        }
        return this.formatRoleset(role[0]);
    }

    /**
     * Get a user's Role in a group
     * @param groupId 
     * @param userId 
     */
    public async getUserRole(groupId: number, userId: number): Promise<groups.roleInfo> {
        const roleset = await this.knex("group_members").select("roleid as roleSetId").where({"groupid":groupId,"userid":userId});
        if (!roleset[0]) {
            const roleSet = await this.getRoleSetByRank(groupId, 0);
            return roleSet;
        }
        const role = await this.getRoleById(roleset[0].roleSetId);
        return role;
    }

    /**
     * Get a group's roles
     * @param groupId 
     */
    public async getRoles(groupId: number): Promise<groups.roleInfo[]> {
        const roles = await this.knex("group_roles").select("id as roleSetId","name","description","groupid as groupId", "rank", "permission_get_wall as getWall", "permission_post_wall as postWall", "permission_get_shout as getShout","permission_post_shout as postShout", "permission_manage_group as manage").where({"groupid":groupId}).orderBy("rank", "asc");
        const formattedRoles = [];
        for (const role of roles){
            formattedRoles.push(this.formatRoleset(role));
        }
        return formattedRoles;
    }

    /**
     * Get a Roleset's Members
     */
    public async getMembers(groupId: number, roleSetId: number, offset: number, limit: number, sort: 'asc'|'desc'): Promise<groups.groupMember[]> {
        const members = await this.knex("group_members").select("userid as userId","roleid as roleSetId").where({"groupid":groupId,"roleid":roleSetId}).limit(limit).offset(offset).orderBy("id", sort);
        return members as groups.groupMember[];
    }

    /**
     * Count Members of a Group Roleset
     */
    public async countMembers(groupId: number, roleSetId: number): Promise<number> {
        const members = await this.knex("group_members").count("id as Total").where({"groupid":groupId,"roleid":roleSetId});
        return members[0]["Total"] as number;
    }

    /**
     * Get a Group's Shout. Returns empty object if no shout
     * @param groupId 
     */
    public async getShout(groupId: number): Promise<groups.groupShout> {
        const shout = await this.knex("group_shout").select("userid as userId","shout","date",'groupid as groupId').where({"groupid":groupId}).limit(1).orderBy("id", "desc");
        return shout[0] as groups.groupShout;
    }

    /**
     * Multi-Get Group Shouts
     * @param groupIds
     */
    public async getShouts(groupIds: number[], limit: number = 100, offset: number = 0): Promise<groups.groupShout[]> {
        let shout = this.knex("group_shout").select("group_shout.userid as userId","group_shout.shout","group_shout.date",'group_shout.groupid as groupId','groups.thumbnail_catalogid as thumbnailCatalogId').orderBy("group_shout.id", "desc").limit(limit).offset(offset).innerJoin('groups','groups.id','group_shout.groupid');
        for (const item of groupIds) {
            shout = shout.orWhere('groupid','=',item);
        }
        const shoutResults = await shout;
        return shoutResults as groups.groupShout[];
    }

    /**
     * Get a Group's Wall
     * @param groupId 
     */
    public async getWall(groupId: number, offset: number, limit: number, orderBy: 'asc'|'desc'): Promise<groups.wall[]> {
        const wall = await this.knex("group_wall").select("id as wallPostId","groupid as groupId","userid as userId","content as wallPost","date").where({"groupid": groupId}).orderBy("id", orderBy).limit(limit).offset(offset);
        return wall as groups.wall[];
    }

    /**
     * Create a Wall Post on a Group
     * @param groupId 
     * @param userId 
     * @param content 
     */
    public async createWallPost(groupId: number, userId: number, content: string): Promise<void> {
        await this.knex("group_wall").insert({
            "groupid": groupId,
            "userid": userId,
            "content": content,
            "date": this.moment().format('YYYY-MM-DD HH:mm:ss'),
        });
    }

    /**
     * Delete a Wall Post
     * @param groupId 
     * @param wallPostId 
     */
    public async deleteWallPost(groupId: number, wallPostId: number): Promise<void> {
        await this.knex("group_wall").delete().where({
            "groupid": groupId,
            "id": wallPostId, 
        });
    }

    /**
     * Search Groups. If query is not provided, groups with most members are shown
     */
    public async search(offset: number, limit: number, query?: string): Promise<groups.groupDetails[]> {
        const groupResults = this.knex("groups").select("groups.id as groupId","groups.name as groupName","groups.description as groupDescription","groups.owner_userid as groupOwnerUserId","groups.membercount as groupMemberCount","groups.thumbnail_catalogid as groupIconCatalogId","groups.status as groupStatus").limit(limit).orderBy("membercount", "desc").offset(offset);
        const results = await groupResults;
        return results as groups.groupDetails[];
    }

    /**
     * Get the Role that a new member would recieve upon joining a group. Throws false if invalid group
     */
    public async getRoleForNewMembers(groupId: number): Promise<groups.roleInfo> {
        const role = await this.knex("group_roles").select("id as roleSetId","name","description","groupid as groupId", "rank", "permission_get_wall as getWall", "permission_post_wall as postWall", "permission_get_shout as getShout","permission_post_shout as postShout", "permission_manage_group as manage").where({"groupid":groupId}).andWhere("rank", ">", 0).orderBy("rank", "asc").limit(1);
        if (!role[0]) {
            throw false;
        }
        return role[0] as groups.roleInfo;
    }

    /**
     * Join a Group (essentially)
     * @param groupId 
     * @param userId 
     */
    public async addUserToGroup(groupId: number, userId: number, roleSetId: number): Promise<void> {
        await this.knex.transaction(async (trx) => {
            // Insert user into group
            await trx("group_members").insert({
                "groupid": groupId,
                "userid": userId,
                "roleid": roleSetId,
            });
            await this.updateGroupMembersCountTRX(trx, groupId);
            // Commit transaction
            await trx.commit();
        });
    }

    private async updateGroupMembersCountTRX(trx: Knex.Transaction, groupId: number): Promise<void> {
        // Count group members
        const currentMemberCount = await trx("group_members").count("id as Total").where({"groupid":groupId}).forUpdate('group_members','groups');
        // Update count
        await trx('groups').update({"membercount": currentMemberCount[0]["Total"]}).where({"id":groupId});
    }

    /**
     * Leave a Group
     */
    public async removeUserFromGroup(groupId: number, userId: number): Promise<void> {
        await this.knex.transaction(async (trx) => {
            // Insert user into group
            await trx("group_members").delete().where({
                "groupid": groupId,
                "userid": userId,
            });
            await this.updateGroupMembersCountTRX(trx, groupId);
            // Commit transaction
            await trx.commit();
        });
    }

    /**
     * Re-Count and Update a Group's Member Count
     * @param groupId 
     */
    public async updateGroupMemberCount(groupId: number): Promise<void> {
        await this.knex.transaction(async (trx) => {
            const currentMemberCount = await trx("group_members").count("id as Total").where({"groupid":groupId}).forUpdate('group_members','groups');
            await trx('groups').update({"membercount": currentMemberCount[0]["Total"]}).where({"id":groupId});
            await trx.commit();
        });
    }

    /**
     * Verify a Permissions Object is Valid
     * @param permissions 
     */
    public async verifyPermissions(permissions: groups.groupPermissions): Promise<boolean> {
        if (!permissions) {
            return false;
        }
        if (permissions.getShout !== 1 && permissions.getShout !== 0) {
            return false;
        }
        if (permissions.getWall !== 1 && permissions.getWall !== 0) {
            return false;
        }
        if (permissions.postWall !== 1 && permissions.postWall !== 0) {
            return false;
        }
        if (permissions.postShout !== 1 && permissions.postShout !== 0) {
            return false;
        }
        if (permissions.manage !== 1 && permissions.manage !== 0) {
            return false;
        }
        return true;
    }

    /**
     * Update a Roleset
     * @param roleSetId 
     * @param name 
     * @param description 
     * @param rank 
     * @param permissions 
     */
    public async updateRoleset(roleSetId: number, name: string, description: string, rank: number, permissions: groups.groupPermissions): Promise<void> {
        await this.knex("group_roles").update({
            'name': name,
            'description': description,
            'rank': rank,
            'permission_get_wall': permissions.getWall,
            'permission_get_shout': permissions.getShout,
            'permission_post_wall': permissions.postWall,
            'permission_post_shout': permissions.postShout,
            'permission_manage_group': permissions.manage,
        }).where({"id":roleSetId});
    }

    /**
     * Create a Roleset for a Group
     * @param groupId 
     * @param name 
     * @param description 
     * @param rank 
     * @param permissions 
     */
    public async createRoleset(groupId: number, name: string, description: string, rank: number, permissions: groups.groupPermissions): Promise<void> {
        await this.knex("group_roles").insert({
            'groupid': groupId,
            'name': name,
            'description': description,
            'rank': rank,
            'permission_get_wall': permissions.getWall,
            'permission_get_shout': permissions.getShout,
            'permission_post_wall': permissions.postWall,
            'permission_post_shout': permissions.postShout,
            'permission_manage_group': permissions.manage,
        });
    }

    /**
     * Delete a Roleset
     * @param roleSetId 
     */
    public async deleteRoleset(roleSetId: number): Promise<void> {
        await this.knex("group_roles").delete().where({"id":roleSetId});
    }

    /**
     * Update a user's Roleset ID in a Group
     * @param groupId 
     * @param roleSetId 
     * @param userId 
     */
    public async updateUserRolesetInGroup(groupId: number, roleSetId: number, userId: number): Promise<void> {
        await this.knex("group_members").update({
            'roleid':roleSetId,
        }).where({'groupid': groupId, 'userid': userId});
    }

    /**
     * Update a Group's Description
     * @param groupId 
     * @param description 
     */
    public async updateDescription(groupId: number, description: string): Promise<void> {
        await this.knex("groups").update({
            'description': description,
        }).where({'id': groupId});
    }

    /**
     * Update a Group's Shout
     * @param groupId 
     * @param shout 
     */
    public async updateShout(groupId: number, userId: number, shout: string): Promise<void> {
        await this.knex("group_shout").insert({
            'groupid': groupId,
            'userid': userId,
            'date': this.moment().format('YYYY-MM-DD HH:mm:ss'),
            'shout': shout,
        });
    }

    /**
     * Create a Group and return the Group ID if successful
     * @param name 
     * @param description 
     * @param userId Group Creator/Owner
     * @param thumbnailId 
     */
    public async create(name: string, description: string, userId: number, groupIconCatalogId: number): Promise<number> {
        const groupInfo = await this.knex("groups").insert({
            'name': name,
            'description': description,
            'owner_userid': userId,
            'membercount': 1,
            'status': groups.groupStatus.ok,
            'thumbnail_catalogId': groupIconCatalogId,
        });
        return groupInfo[0] as number;
    }

    /**
     * Update a Group's Icon ID
     * @param groupId 
     * @param iconId 
     */
    public async updateGroupIconId(groupId: number, iconId: number): Promise<void> {
        await this.knex("groups").update({
            'thumbnail_catalogid': iconId,
        }).where({'id': groupId});
    }

    /**
     * Update Group Ownership. This does not rank the new owner or modify existing owners
     * @param groupId 
     * @param userId 
     */
    public async updateGroupOwner(groupId: number, userId: number): Promise<void> {
        await this.knex("groups").update({
            'owner_userid': userId,
        }).where({'id': groupId});
    }

    /**
     * Given a groupId, this method checks weather or not new members will have to be approved before joining
     * @param groupId 
     */
    public async doesGroupRequireApprovalForNewMembers(groupId: number): Promise<boolean> {
        let status = await this.knex('groups').select('approval_required').where({
            'id': groupId,
        }).limit(1);
        if (status[0]['approval_required'] === 1) {
            return true;
        }
        return false;
    }

    /**
     * Insert a user into a group_members_pending
     * @param groupId 
     * @param userId 
     */
    public async insertPendingGroupMember(groupId: number, userId: number): Promise<void> {
        await this.knex('group_members_pending').insert({
            'group_id': groupId,
            'user_id': userId, 
        });
    }

    /**
     * Given a groupId and userId, this method will check weather or not the user is pending to join a group
     * @param groupId 
     * @param userId 
     */
    public async isUserPendingToJoinGroup(groupId: number, userId: number): Promise<boolean> {
        let result = await this.knex('group_members_pending').select('id').where({
            'group_id': groupId,
            'user_id': userId,
        }).limit(1);
        if (result[0] && result[0]['id']) {
            return true;
        }
        return false;
    }

    /**
     * Given a groupId and userId, this method will delete the user from pending group joins involving that groupId
     * @param groupId 
     * @param userId 
     */
    public async removeUserFromPendingGroupJoins(groupId: number, userId: number): Promise<void> {
        await this.knex('group_members_pending').delete().where({
            'group_id': groupId,
            'user_id': userId,
        });
    }

    /**
     * Given a groupId, this method will grab members waiting to join a group
     * @param groupId 
     */
    public async getPendingMembers(groupId: number, offset: number, limit: number): Promise<group.GroupJoinRequest[]> {
        let page = await this.knex('group_members_pending').select('group_id as groupId','user_id as userId').limit(limit).offset(offset);
        return page;
    }

    /**
     * Update groups.approval_required status
     * @param groupId The groupId to update
     * @param approvalRequired Weather or not the group will require approval
     */
    public async updateGroupApprovalRequiredStatus(groupId: number, approvalRequired: number): Promise<void> {
        await this.knex("groups").update({
            'approval_required': approvalRequired,
        }).where({'id': groupId});
    }

    /**
     * Get a group's items
     * @param groupId 
     * @param offset 
     * @param limit 
     * @param sort 
     */
    public async getGroupItems(groupId: number, offset: number, limit: number, sort: 'asc'|'desc'): Promise<catalog.SearchResults[]> {
        const selectQuery = this.knex("catalog").select("catalog.id as catalogId","catalog.name as catalogName","catalog.price", "catalog.currency","catalog.creator as creatorId","catalog.creator_type as creatorType","catalog.original_creatorid as userId","catalog.is_collectible as collectible", "catalog.max_sales as maxSales").limit(25).offset(offset).orderBy('id', sort).where({
            'creator': groupId,
            'creator_type': catalog.creatorType.Group,
            'is_for_sale': catalog.isForSale.true,
        });
        return selectQuery;
    }

    /**
     * Get a Group's Funds
     * @param groupId 
     */
    public async getGroupFunds(groupId: number): Promise<groups.GroupFunds> {
        const funds = await this.knex("groups").select("balance_one as Primary","balance_two as Secondary").where({'id': groupId});
        return funds[0] as groups.GroupFunds;
    }
}

export default GroupsDAL;
