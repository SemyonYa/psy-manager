export class UserData {
    id: number;
    login: string;
    organization: string;
    token: string;

    fill(id: string, login: string, organization: string, token: string) {
        this.id = Number.parseInt(id, 10);
        this.login = login;
        this.organization = organization;
        this.token = token;
    }
}
