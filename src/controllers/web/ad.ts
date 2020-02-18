import { Controller, Get, All, Next, Req, Res, UseBefore, Render, QueryParams, PathParams, Redirect, Response, Request, Locals, UseAfter, Required, Use, UseBeforeEach, ModelStrict } from "@tsed/common";
import { Description, Summary, Returns } from "@tsed/swagger"; // import swagger Ts.ED module
import { Exception, NotFound, BadRequest } from "ts-httpexceptions";
import * as Express from 'express';
import * as model from '../../models/models';
import { WWWTemplate } from '../../models/v2/Www';
import controller from '../controller'
import moment = require("moment");
import xss = require('xss');
import Config from '../../helpers/config';
import { urlEncode } from '../../helpers/Filter';
// Models
import * as UserModel from '../../models/v1/user';
import { NoAuth, YesAuth } from "../../middleware/Auth";
import {numberWithCommas} from '../../helpers/Filter';

@Controller("/")
export class WWWCatalogController extends controller {
    constructor() {
        super();
    }

    @Get('/ads')
    @Summary('Ads dashboard')
    @Use(YesAuth)
    @Render('ad/dashboard')
    public async adsDashboard(
        @Locals('userInfo') userInfo: model.user.UserInfo,
    ) {
        return new this.WWWTemplate({title: 'Ads Dashboard'});
    }

    @Get('/ad/catalog/create/:catalogId')
    @Render('ad/catalog_create')
    @Use(YesAuth)
    public async createCatalogAd(
        @Locals('userInfo') userInfo: model.user.UserInfo,
        @PathParams('catalogId', Number) catalogId: number
    ) {
        let info = await this.catalog.getInfo(catalogId);
        if (info.creatorType === model.catalog.creatorType.User && info.creatorId !== userInfo.userId) {
            throw new this.BadRequest('InvalidCatalogId');
        }else if (info.creatorType === model.catalog.creatorType.Group) {
            let groupInfo = await this.group.getInfo(info.creatorId);
            if (groupInfo.groupOwnerUserId !== userInfo.userId) {
                throw new this.BadRequest('InvalidCatalogId');
            }
        }
        return new this.WWWTemplate({title: 'Create Catalog Ad', page: {
            catalogInfo: info,
        }});
    }

    @Get('/ad/group/create/:groupId')
    @Render('ad/group_create')
    @Use(YesAuth)
    public async createGroupAd(
        @Locals('userInfo') userInfo: model.user.UserInfo,
        @PathParams('groupId', Number) groupId: number
    ) {
        let info = await this.group.getInfo(groupId);
        if (info.groupStatus === model.group.groupStatus.locked || info.groupOwnerUserId !== userInfo.userId) {
            throw new this.BadRequest('InvalidGroupId');
        }
        return new this.WWWTemplate({title: 'Create Group Ad', page: {
            groupInfo: info,
        }});
    }
}
