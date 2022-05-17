import { Contact } from "./Contact";

export class FindContactByIdGql {
    data = {
        findContactById : new class GetByIdRequest {
            id = 0;
            firstName = "";
            lastName = "";
            phoneNumber = "";
            emailAddress = "";
            status = "";
            comment = "";
            company = {
                id : 0,
                name : ""
            }
        }
}
}