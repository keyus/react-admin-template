import store from '@store'
import {Menus} from '@view/router'
import history from '@history'

class Util {
    reg = {
        account: /^[a-z0-9]{4,20}$/,
    }
    getHomePath = ()=>{
        const role = this.getRole();
        const menus = Menus.filter(it=>it.role.includes(role));
        if(Menus.length){
            return menus[0]?.path;
        }
    }
    goHome = ()=>{
        history.push(this.getHomePath())
    }
    isLogin = ()=> localStorage.getItem('token');
    getRole=()=> {
        return store.getState().user?.roleType;
    };
    getUser=()=> {
        return store.getState().user || {};
    };
    getUserId=()=> {
        return Number(store.getState().user?.id);
    };
}
export default new Util();
