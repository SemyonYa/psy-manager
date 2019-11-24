export class UserData {
    id: number;
    login: string;
    organization: string;
    token: string;
    role: string;

    fill(id: string, login: string, organization: string, token: string, role: string) {
        this.id = Number.parseInt(id, 10);
        this.login = login;
        this.organization = organization;
        this.token = token;
        this.role = role;
    }
}
