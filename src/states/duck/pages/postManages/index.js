import * as types from './constants';
let post = []
const reducer = (state = post, action) => {
    switch (action.type) {
        case types.SET_POST:
            post = action.value
            return post;
        case types.SET_COMMENT:
            let comment = action.value
            if (post && comment) {
                for (let i = 0; i < post.length; i++) {
                    let cmt = []
                    for (let j = 0; j < comment.length; j++) {
                        if (post[i].postId === comment[j].postId) {
                            post[i] = {
                                ...post[i],
                                cmt: cmt = [
                                    ...cmt,
                                    comment[j]
                                ]
                            }
                        }
                    }
                }
            }
            return post
        default:
            return state;
    }
}
export default reducer;