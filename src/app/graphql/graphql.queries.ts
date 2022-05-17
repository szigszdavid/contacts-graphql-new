import { gql } from "apollo-angular";

const FIND_ALL = gql`
{
        query findAllContacts(page : Int)
        {
        firstName
        lastName
        emailAddress
        phoneNumber
        company {
            id
            name
        }
        comment
        status
        }
    } 
`

export { FIND_ALL };