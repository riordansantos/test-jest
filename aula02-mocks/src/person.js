class Person {
  static validate (person) {
    if (!person.name) throw new Error('Name is required')
    if (!person.cpf) throw new Error('CPF is required')
  }

  static format(person){
    const [name, ...lastName] = person.name.split(' ')
    return {
        cpf: person.cpf.replace(/\D/g, ''),
        name, 
        lastName: lastName.join(' ')
    }
  }


  static process (person) {
    this.validate(person)
    return 'ok'
  }
}
Person.process({ name: 'John Doe', cpf: '123.456.789-00' })
export default Person;
