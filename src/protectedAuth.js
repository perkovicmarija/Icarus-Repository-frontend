export function protectedAuth(protectedAuthorities) {
    if(!protectedAuthorities || protectedAuthorities.length === 0) {
        return true;
    }
    const userAuthorities = JSON.parse(localStorage.getItem('authorities'));
    for(let i = 0, l = userAuthorities.length; i < l; i++) {
        for(let j = 0, m = protectedAuthorities.length; j < m; j++) {
            if(userAuthorities[i].name === protectedAuthorities[j]) {
                return true;
            }
        }
    }
    return false;
}