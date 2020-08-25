"use strict";var errorTransform=function(a){return"InternalServerError"===a?"An internal server error has ocurred.":"LogoutRequired"===a?"You must be logged out to perform this action.":"InvalidUsernameOrPassword"===a?"The username or password specified is invalid.":"LoginRequired"===a?"You must be logged in to perform this action.":"InvalidBirthDate"===a?"The birth-date you entered is invalid. Please try again.":"InvalidUsername"===a?"The username you entered is invalid. Please try again.":"InvalidPassword"===a?"The password you entered is invalid. Please try again.":"UsernameConstraint1Space1Period1Underscore"===a?"Your username can only contain 1 space, 1 period, and 1 underscore.":"UsernameConstriantCannotEndOrStartWithSpace"===a?"Your username cannot start or end with a space.":"UsernameConstraintInvalidCharacters"===a?"Your username does not contain valid characters. Please try again.":"UsernameConstriantTooLong"===a?"Your username exceeds the maximum length of 18 characters.":"UsernameConstrintTooShort"===a?"Your username must be at least 3 characters.":"OneAccountPerIP"===a?"Sorry! You can't signup right now. Please try again later.":"CannotSendRequest"===a?"You cannot send this request right now.":"InvalidPrice"===a?"The price specified is invalid.":"CannotBeSold"===a?"This item cannot be sold.":"CannotTradeWithUser"===a?"You cannot trade with this user right now.":"NotEnoughCurrency"===a?"You do not have enough currency for this transaction.":"InvalidAmount"===a?"The amount specified is invalid.":"NoLongerForSale"===a?"This item is no longer for sale.":"SellerHasChanged"===a?"This item is no longer for sale.":"CurrencyHasChanged"===a?"This item is no longer for sale.":"PriceHasChanged"===a?"The price for this item has changed. Please reload this page to see the latest price.":"AlreadyOwns"===a?"You already own this item.":"ItemStillForSale"===a?"You cannot buy this item right now.":"ItemNoLongerForSale"===a?"This item is no longer for sale.":"OneOrMoreItemsNotAvailable"===a?"One or more of the items in this trade are no longer available. This trade cannot be completed.":"AvatarCooldown"===a?"You cannot update your avatar right now. Try again in a few minutes.":"EmailVerificationRequired"===a?"You must verify your account's email address before you can perform this action.":"BlurbTooLarge"===a?"Your blurb is too large.":"InvalidOldPassword"===a?"The old password specified does not match your current password. Please try again.":"InalidPassword"===a?"THe password specified is invalid. Please try again.":"InvalidCode"===a?"The code specified is invalid.":"FloodCheck"===a?"You cannot complete this action right now. Please try again in a few minutes.":"InvalidEmail"===a?"The email specified does not seem to be valid.":"InvalidTheme"===a?"The theme specified is invalid.":"InvalidOption"===a?"The option specified is invalid.":"CaptchaValidationFailed"===a?"Captcha Validation Failed. Please fill out the captcha.":"InvalidGroupPermissions"===a?"You do not have permission to perform this action.":"AlreadyGroupMember"===a?"You are already a member of this group.":"TooManyGroups"===a?"You are in the maximum amount of groups. Please leave a group and try again.":"InvalidGroupRank"===a?"The rank name specified must be between 1 and 254.":"InvalidRolesetName"===a?"The roleset name is invalid.":"InvalidRolesetDescription"===a?"The roleset description is invalid.":"InvalidRolesetPermissions"===a?"The roleset permissions are invalid.":"RankIdIsTaken"===a?"The rank specified is invalid or currently in use by another roleset.":"TooManyRolesets"===a?"This group has reached the maximum amount of rolesets.":"RolesetHasMembers"===a?"You cannot delete a roleset that currently has members. Re-rank all existing members to a new role, then try again.":"CannotDeleteFirstRoleInGroup"===a?"You cannot delete the first role in a group.":"UserNotInGroup"===a?"The user specified is not a member of this group.":"CannotRankUser"===a?"You are not authorized to rank this user.":"ShoutCooldown"===a?"You cannot perform this action right now. Please try again later.":"InvalidFileType"===a?"The file type provided is invalid. Please try again.":"InvalidGroupName"===a?"The group name specified is invalid.":"InvalidGroupDescription"===a?"The group description specified is invalid.":"GroupNameTaken"===a?"The group name specified is already in use by another group. Please try another name.":"InvalidReason"===a?"The reason specified is invalid.":"InvalidPrivateReason"===a?"The private reason specified is invalid.":"ConstraintIfDeletedUserMustAlsoBeTerminated"===a?"If a user is deleted, the \"Terminated\" option must also be selected. Please try again.":"CommentTooLarge"===a?"Your comment is too large. Please try again.":"InvalidCurrencyAmount"===a?"The currency amount specified is invalid.":"InvalidCatalogIdOrState"===a?"The state or catalogId is invalid.":"InvalidBannerText"===a?"The banner text specified is invalid.":"InvalidRank"===a?"The rank specified is invalid.":"RankCannotBeAboveCurrentUser"===a?"The rank specified cannot be above your rank.":"InvalidSubCategoryId"===a?"The subCategoryId specified is invalid.":"InvalidTitle"===a?"The title specified is invalid.":"InvalidBody"===a?"The body specified is invalid.":"ThreadLocked"===a?"This thread is locked, so you are unable to reply to it.":"InvalidCatalogName"===a?"The catalog name specified is invalid.":"InvalidModerationStatus"===a?"The moderation status specified is invalid.":"InvalidCatalogDescription"===a?"The description specified is invalid.":"InvalidIsForSaleOption"===a?"The isForSale option specified is invalid.":"ConstraintPriceTooHigh"===a?"The price specified is too high.":"InvalidComment"===a?"The comment specified is invalid.":"InvalidOBJSpecified"===a?"The OBJ file specified is invalid.":"InvalidMTLSpecified"===a?"The MTL file specified is invalid.":"TooManyRequests"===a?"You have been making too many requests. Try again later.":"GroupJoinRequestPending"===a?"You are already awaiting approval by an admin. Check back later.":"RankAlreadyExists"===a?"Each roleset must have a unique rank, and this rank is already in use by another roleset.":"InvalidMaxPlayers"===a?"The maximum amount of players you can have in a game server at once is 10.":"InvalidGenre"===a?"The genre specified is invalid.":"InvalidNameOrDescription"===a?"Please specify a valid name and description.":"TooManyGames"===a?"You cannot create any more games.":"NoFileSpecified"===a?"Please specify at least one file.":"ModerationStatusConflict"===a?"You cannot perform this action right now due to a moderation status conflict. Try again later.":"ConstraintEmailVerificationRequired"===a?"In order to perform this action, your account must have a verified email. Go to your settings to add & verify your email address.":"EmailAlreadyInUse"===a?"Sorry, this email is already in use. Please use a different email.":"AvatarRenderRequired"===a?"Sorry, you cannot create an outfit while your current avatar is pending. Try again later.":"MaximumOutfitsReached"===a?"You have reached the maximum amount of outfits. Delete an outfit, and try agian.":"InvalidOutfitId"===a?"This outfit can't be modified right now. Refresh the page, and try again.":"Cooldown"===a?"You cannot perform this action right now. Try again later.":"ItemCannotBeDeleted"===a?"This item cannot be deleted.":"RateTooSmall"===a?"The rate specified is too small.":"RateTooLarge"===a?"The rate specified is too large.":"BalanceTooSmall"===a?"The balance amount specified is too small.":"ReachedMaximumOpenPositions"===a?"You have reached the maximum amount of open positions.":"NotEnoughInPositionBalance"===a?"There is not enough in this positions balance to complete your transaction. You have not been charged.":"PurchaseAmountTooLow"===a?"The purchase amount specified is too low. You have not been charged.":"CannotPurchaseOwnedPosition"===a?"You cannot purchase from your own position.":"An unknown error has occurred. Please try again later, or contact support."};





