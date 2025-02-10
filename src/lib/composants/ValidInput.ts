
export type Champ = "password" | "username" | "email" | "number" | "text"

export default function valid(text: string,type: Champ): boolean {
    let re: RegExp;
    switch (type){

        case "password": {
            re = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$");
            return re.test(text);
        }

        case "username": {
            re = new RegExp("^.{4,}$");
            return re.test(text);
        }

        case "email": {
            re = new RegExp("^[\\w\\-\\.]+@([\\w-]+\\.)+[\\w-]{2,}$", "m");
            return re.test(text);
        }

        case "number": {
            re = new RegExp("^[0-9]+$");
            return re.test(text);
        }

        case "text": {
            return text.trim().length !== 0;
        }
    }
}
