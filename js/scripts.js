function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.fullName = function() {
    return this.firstName + " " + this.lastName;
  }
}



var newContact = new Contact("Ward", "Chamberlain", "555-555-5555");
var newContact2 = new Contact("Lenny", "Chamberlain", "555-555-5555");
var newContact3 = new Contact("Frank", "Chamberlain", "555-555-5555");
var omar = new Contact ("Omar", "Kadah", "5515515551");




function AddressBook() {
  this.uniqueId = 0,
  this.contacts = [],

  this.assignId = function() {
    this.uniqueId += 1;
    return this.uniqueId;
  },

  this.addContact = function(contact) {
    contact.uniqueId = this.assignId();
    this.contacts.push(contact);
  }

}

var addressBook = new AddressBook();

addressBook.addContact(omar);
addressBook.addContact(newContact);
addressBook.addContact(newContact2);
addressBook.addContact(newContact3);

// console.log(addressBook);



AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]){
      if (this.contacts[i].uniqueId == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}


AddressBook.prototype.deleteContact = function(id) {
  for(var i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].uniqueId == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

console.log(addressBook.findContact(3));

addressBook.deleteContact(3);

console.log(addressBook);
addressBook.contacts.length;
