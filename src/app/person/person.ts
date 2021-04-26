import { Address } from "./address";
import { PhoneNumber, PhoneNumberData } from "./phone-number";
import { AgeClass, AgeClassType } from "./age-class.enum";

export class Person {

    constructor(
        readonly id: string,
        readonly lastname: string,
        readonly firstnames: string[] = [],
        readonly middlenames: string[] = [],
        readonly dob: string = '',
        readonly ageclass: AgeClassType = null,
        readonly emailaddresses: string[] = [],
        readonly phonenumbers: PhoneNumber[] = [],
        readonly mainCorrespondenceAddress: Address = Address.EMPTY_ADDRESS,
        readonly billingAddress: Address = Address.EMPTY_ADDRESS
    ) { }

    static fromObject({ id, lastname, firstnames, middlenames, dob, ageclass, emailaddresses, phonenumbers,
        mainCorrespondenceAddress, billingAddress }:
        {
            id: string,
            lastname: string,
            firstnames?: string[],
            middlenames?: string[],
            dob?: string,
            ageclass?: AgeClassType,
            emailaddresses?: string[],
            phonenumbers?: PhoneNumber[] | null,
            mainCorrespondenceAddress?: Address,
            billingAddress?: Address
        }): Person {

            let pns:PhoneNumber[] = [];
            if (phonenumbers) {
                pns = phonenumbers.map((p:PhoneNumber, idx:number) => new PhoneNumber(p.number, p.mobile));
            }
            let mcr = mainCorrespondenceAddress ? new Address(mainCorrespondenceAddress.country, mainCorrespondenceAddress.lines) : Address.EMPTY_ADDRESS;
            let bil = billingAddress ? new Address(billingAddress.country, billingAddress.lines) : Address.EMPTY_ADDRESS;

        return new Person(id, lastname, firstnames, middlenames, dob, ageclass, emailaddresses, pns, mcr, bil);
    }

    static fromEditState({ id, lastname, firstnames, middlenames, dob, emailaddresses, phonenumbers,
        mainCorrespondenceAddress, billingAddress }:
        {
            id: string,
            lastname: string,
            firstnames: string[],
            middlenames: string[],
            dob: string,
            emailaddresses: string[],
            phonenumbers: [{number: string, mobile: boolean}],
            mainCorrespondenceAddress: {country: string, lines: string[]},
            billingAddress: {country: string, lines: string[]}
        }) : Person {

            let phnums: PhoneNumber[] = [];
            for (let i = 0; i < phonenumbers.length; i++) {
                if(!phonenumbers[i].number || phonenumbers[i].number === '') {
                    phnums[i] = PhoneNumber.EMPTY_PHONENUMBER;
                }
            }
            phnums = phnums.filter((phn) => phn && phn !== PhoneNumber.EMPTY_PHONENUMBER);

            let mcor: Address = new Address(mainCorrespondenceAddress.country, mainCorrespondenceAddress.lines);
            let bill: Address = new Address(billingAddress.country, billingAddress.lines);

            return new Person(
                id,
                lastname,
                firstnames.filter((val) => val && val !== ''),
                middlenames.filter((val) => val && val !== ''),
                dob,
                null,
                emailaddresses.filter((val) => val && val !== ''),
                phnums,
                mcor.country !== '' && 0 < mcor.lines.length ? mcor : Address.EMPTY_ADDRESS,
                bill.country !== '' && 0 < bill.lines.length ? bill : Address.EMPTY_ADDRESS

            );
        }

    static fromPerson(id: string, lastname: string,
        firstnames: string[] = [], middlenames: string[] = [],
        dob: string = '',
        emailAddresses: string[] = [],
        phonedata: PhoneNumberData[] = [],
        correspondenceAddressLines: string[] = [], correspondenceAddressCountry: string = '',
        billingAddressLines: string[] = [], billingAddressCountry: string = '',
        ageclass: AgeClassType = AgeClass.ADULT): Person {

        return new Person(id, lastname, firstnames, middlenames, dob, ageclass, emailAddresses, PhoneNumber.fromElementMap(phonedata), new Address(correspondenceAddressCountry, correspondenceAddressLines), new Address(billingAddressCountry, billingAddressLines));

    }

    static fromJSON(jsonPerson: string): Person {
        return JSON.parse(jsonPerson);
    }

    copy({ id, lastname, firstnames, middlenames, dob, emailaddresses, phonenumbers,
        mainCorrespondenceAddress, billingAddress, ageclass }:
        {
            id?: string, lastname?: string,
            firstnames?: string[], middlenames?: string[],
            dob?: string,
            emailaddresses?: string[],
            phonenumbers?: PhoneNumber[],
            mainCorrespondenceAddress?: Address,
            billingAddress?: Address,
            ageclass?: AgeClassType
        } = {}): Person {
        return new Person(
            id != null ? id : this.id,
            lastname != null ? lastname : this.lastname,
            firstnames != null ? firstnames : this.firstnames,
            middlenames != null ? middlenames : this.middlenames,
            dob != null ? dob : this.dob,
            ageclass != null ? ageclass : this.ageclass,
            emailaddresses != null ? emailaddresses : this.emailaddresses,
            phonenumbers != null ? phonenumbers : this.phonenumbers,
            mainCorrespondenceAddress != null ? mainCorrespondenceAddress : this.mainCorrespondenceAddress,
            billingAddress != null ? billingAddress : this.billingAddress
        );
    }

    toJSONString(): string {
        return JSON.stringify(this);
    }

    private toJSON(): object {
        let obj: any = { 'id': this.id, 'lastname': this.lastname };
        if (this.firstnames && 0 < this.firstnames.length) {
            obj.firstnames = this.firstnames;
        }
        if (this.middlenames && 0 < this.middlenames.length) {
            obj.middlenames = this.middlenames;
        }
        if (this.dob && this.dob !== '') {
            obj.dob = this.dob;
        }
        if (this.ageclass) {
            obj.ageclass = this.ageclass;
        }
        if (this.emailaddresses && 0 < this.emailaddresses.length) {
            obj.emailaddresses = this.emailaddresses;
        }
        if (this.phonenumbers && 0 < this.phonenumbers.length) {
            obj.phonenumbers = this.phonenumbers;
        }
        if (this.mainCorrespondenceAddress && this.mainCorrespondenceAddress !== Address.EMPTY_ADDRESS) {
            obj.mainCorrespondenceAddress = this.mainCorrespondenceAddress;
        }
        if (this.billingAddress && this.billingAddress !== Address.EMPTY_ADDRESS) {
            obj.billingAddress = this.billingAddress;
        }
        return obj;
    }

    toEditableObject(): any {
        return {
            id: this.id,
            lastname: this.lastname,
            firstnames: 0 < this.firstnames.length ? [...this.firstnames]: [''],
            middlenames: 0 < this.middlenames.length ? [...this.middlenames]: [''],
            dob: this.dob,
            emailaddresses: 0 < this.middlenames.length ? [...this.emailaddresses] : [''],
            phonenumbers: 0 < this.middlenames.length ? this.phonenumbers.map((pn:PhoneNumber) => pn.toEditableObject()) : [PhoneNumber.EMPTY_PHONENUMBER.toEditableObject()],
            mainCorrespondenceAddress: this.mainCorrespondenceAddress.toEditableObject(),
            billingAddress: this.billingAddress.toEditableObject() 
        };
    }

    static blankEditableObject(): any {
        return new Person('', '').toEditableObject();
    }

    toLastNameAndInitials(): string {
        let name = this.lastNameWithCommaIfNecessary();
        name += this.toInitialString(this.firstnames);
        name += this.toInitialString(this.middlenames)
        return name;
    }

    lastNameWithCommaIfNecessary() {
        let name = this.lastname;
        if (this.hasSomeFirstOrMiddleNames()) {
            name += ',';
        }
        return name;
    }

    private hasSomeFirstOrMiddleNames() {
        const firstNamesPresent = 0 < this.firstnames.length;
        const middleNamesPresent = 0 < this.middlenames.length;
        return firstNamesPresent || middleNamesPresent;
    }

    private toInitialString(nameArr: string[]): string {
        let name: string = '';
        if (nameArr) {
            nameArr.forEach(fn => name += this.nameToInitial(fn));
        }
        return name;
    }

    nameToInitial = (name: string | null) => name && name !== '' ? ' ' + name.charAt(0) + '.' : '';

    static personComparator = (left: Person, right: Person): number => {
        let leftName = left.toLastNameAndInitials();
        let rightName = right.toLastNameAndInitials();
        return leftName.localeCompare(rightName, 'en', { sensitivity: 'base', ignorePunctuation: true });
    };

    effectiveBillingAddress(): Address {
        if (this.billingAddress === Address.EMPTY_ADDRESS) {
            return this.mainCorrespondenceAddress;
        } else {
            return this.billingAddress;
        }
    }
}