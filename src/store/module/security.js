import {UserApi, Credentials} from "../../../api/user";

const UserStore= {
    async login(username,password){
        const creds = await new Credentials(username,password);
        try {
            await UserApi.login(creds);
        }catch (error){
            alert(error.description);
            return false;
        }
        await localStorage.setItem("loggedIn","true");
        const data =  await UserApi.getCurrentUser();
        this.saveName(data.firstName,data.lastName);
        await localStorage.setItem("img", data.avatarUrl);
        await localStorage.setItem("id", data.id);
        return true;
    },
    async logout(){
        await localStorage.setItem("loggedIn", "false");
        await localStorage.setItem("id", "-666");
        await UserApi.logout();
    },
    isLoggedIn() {
        return localStorage.getItem("loggedIn") === 'true';
    },
    getName(){
        return localStorage.getItem("fullName");
    },
    getImg(){
        return localStorage.getItem("img");
    },

    async saveName(firstName,lastName){
        await localStorage.setItem("fullName", firstName + " " + lastName);
    },

    async saveImg(img){
        await localStorage.setItem("img", img);
    },
    getUserId(){
        return localStorage.getItem("id");
    }
}
export default UserStore