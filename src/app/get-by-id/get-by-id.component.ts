import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/Contact';
import { ContactGql } from 'src/ContactGql';
import { FindContactByIdGql } from 'src/FindContactByIdGql';
import { GetByIdRequest } from 'src/GetByIdRequest';
import { GraphqlService } from '../graphql.service';

@Component({
  selector: 'app-get-by-id',
  templateUrl: './get-by-id.component.html',
  styleUrls: ['./get-by-id.component.css']
})
export class GetByIdComponent implements OnInit {

  data : FindContactByIdGql | undefined
  contact = new GetByIdRequest()

  constructor(private service : GraphqlService, private route : ActivatedRoute, private router: Router) { }

  async ngOnInit(): Promise<void> {

    const id = +this.route.snapshot.paramMap.get("id")!;
    this.data = await this.service.getContactByIds(id);
    console.log(id, this.data);
    
    this.contact = this.data.data.findContactById
    this.contact.id = id
    console.log(this.contact);
    
  }

  async handleDelete(): Promise<void> {
    await this.service.deleteContact(this.contact.id);
    this.router.navigate(['']);
  }

}
