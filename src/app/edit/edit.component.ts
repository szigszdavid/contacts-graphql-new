import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateContactRequestBody } from 'src/CreateContactRequestBody';
import { FindContactByIdGql } from 'src/FindContactByIdGql';
import { GetByIdRequest } from 'src/GetByIdRequest';
import { GraphqlService } from '../graphql.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  contact = new FindContactByIdGql();

  constructor(
    private service: GraphqlService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    if (id) {
      this.contact = await this.service.getContactByIds(+id);
      console.log(this.contact);
      this.contact.data.findContactById.id = parseInt(id);
    }
  }

  async handleSave(contact: CreateContactRequestBody): Promise<void> {
    console.log(this.contact.data.findContactById.id);

    if (this.contact.data.findContactById.id) {
      await this.service.editContact(
        this.contact.data.findContactById.id,
        contact
      );
      this.location.back();
    } else {
      await this.service.createContact(contact);
      this.router.navigate(['/contacts']);
    }
  }
}
