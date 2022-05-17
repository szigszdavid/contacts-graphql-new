import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Contact } from 'src/Contact';
import { ContactGql } from 'src/ContactGql';
import { GraphqlService } from '../graphql.service';
import { FIND_ALL } from '../graphql/graphql.queries';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public contacts :  Contact[] = [];
  data =  new ContactGql();
  loading = false;
  error : any;

  constructor(private apollo: Apollo, private service : GraphqlService) { }

  async ngOnInit(): Promise<void> {
    
  this.data = await this.service.getContacts()
  console.log("loist",this.data);
  
  this.contacts = this.data.data.findAllContacts;
  
  }

}
