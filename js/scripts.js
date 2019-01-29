function Email(address) {
  this.address = address;
  // this.type = type;
}




function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emails = [];
  this.fullName = function() {
    return this.firstName + " " + this.lastName;
  }
}

Contact.prototype.addEmails = function(emailInputs) {
  var emails = [];

  for(var i = 0; i < emailInputs.length; i++) {
    this.emails.push(emailInputs[i]);
  }
  // emailInputs.forEach(function(email) {
  //   emails.push(email.address);
  // }); The reason is that when passing a regular function as a callback, when it is invoked the this is not actually preserved.


}

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

// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.uniqueId + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  var emails = "";
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  //$(".email").html(contact.emails[0].address);
  contact.emails.forEach(function(email){
    emails +=("<li>" + email.address + "</li>");
    console.log(emails);
  });
  $(".emails").html(emails);



  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.uniqueId + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmails = [];

    $("input.email").each(function(){
      if($(this).val()) {
        var inputtedEmail = new Email($(this).val());
        inputtedEmails.push(inputtedEmail);
      }
    });

    console.log(inputtedEmails);

    var inputtedEmail = $("input#email").val();

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#email").val("");


    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
    newContact.addEmails(inputtedEmails);
    console.log(newContact);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})
