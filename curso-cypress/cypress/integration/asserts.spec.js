/// <reference types="cypress" />

it('Igualdade', () => {
    const a = 1;
    expect(a).equal(1);
    //expect(a, "Deveria ser um").equal(2);
    expect(a).to.be.equal(1);
    expect("a").not.equal("b");
})

it ("bolean", () => {
    const a = true;
    const b = null;
    let c;
    expect(a).true;
    expect(b).null;
    expect(c).to.be.undefined;
})

it ('Equalidade de objetos', ()=>{
    const obj = {
        a:1,
        b:2
    }

    expect(obj).equal(obj)
    expect(obj).equals(obj)
    expect(obj).eql({a: 1,b: 2})
    expect(obj).include({a: 1})
    expect(obj).to.have.property('b', 2)
    expect(obj).to.have.property('b', 2)
    expect(obj).not.empty

})



it("Arrays", () =>{
    const arr = [1,2,3]
    expect(arr).to.have.members([1,2,3])
    expect(arr).to.include.members([1,2])
    expect(arr).to.not.empty
    expect([]).to.empty
})


it ("Tipos", () =>{
    const num = 1
    const str = 'String'

    expect(num).to.be.a('number')
    expect(str).to.be.a('string')
    expect({}).to.be.an('object')
    expect([]).to.be.an('array')
})


it ("String", () => {
    const str = "String de teste"
    expect(str).equal("String de teste")
    expect(str).length(15)
    expect(str).contains('de')
    expect(str).match(/^String/)
    expect(str).match(/teste$/)
})

it("Numeros", () => {
    const num = 4;
    const float = 5.5;

    expect(num).equal(4)
    expect(num).above(2)
    expect(num).below(7)
    expect(float).equal(5.5)
    expect(float).closeTo(5.4, 0.1)
    expect(float).above(5)
})
