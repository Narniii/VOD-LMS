import { isEmptyString } from "./utils";

export const standard_mapStateToProps = (state, ownProps) =>
{
    return {
        currentUser: state.currentUser,
        currentUserToken: state.currentUserToken,
        isLoggedIn: !isEmptyString(state.currentUserToken),
        loginLoading: !isEmptyString(state.currentUserToken) && state.currentUser === undefined,
        currentCart: state.currentCart,
    };
}
export const standard_mapDispatchToProps = (dispatch, ownProps) =>
{
    return {
        dispatch: dispatch,
    }
};