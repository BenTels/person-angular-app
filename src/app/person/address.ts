export class Address {

    static EMPTY_ADDRESS: Address = new Address('');
    static WORKING_ADDRESS: Address = new Address('', ['']);

    constructor(readonly country: string, readonly lines: string[] = []){};

    copy({newCountry, newLines} : {newCountry?: string, newLines?: string[]} = {}) : Address {
        if (newCountry === '') {
            throw new Error('Country is mandatory in an address')
        }
        return new Address(
            !newCountry ? this.country : newCountry,
            !newLines ? this.lines : (0 < newLines.length ? newLines : undefined)
        );
    }

    toEditableObject(): any {
        return {country: this.country, lines: 0 < this.lines.length ? [...this.lines] : ['']};
    }
}