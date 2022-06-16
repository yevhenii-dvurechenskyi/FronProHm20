class ListElement{
    constructor(id, title, quantity, unitMeasurement){
        this.id = id;
        this.title = title;
        this.quantity = quantity;
        this.unitMeasurement = unitMeasurement;
    }
}

class ShoppingList{
    nameList = 'Products list';
    authorList = 'Dvurechenskij Yevhenii';
    maxListElements = 4;
    shoppingListArray = [];
    count = 0;
    addItem(title, quantity, unitMeasurement){
        try{
            let id = ++this.count;
            let shoppingList = new ListElement(id, title, quantity, unitMeasurement);
            shoppingList[Symbol.iterator] = function() {
                const values = Object.entries(this);
                let index = -1;
                return {
                    next() {
                        index++;
                        return {
                            value: values[index],
                            done: index >= values.length
                        }
                    }
                }
            }
            if(this.count < 6){
                if(shoppingList.title !== ``){
                    if(shoppingList.quantity > 0){
                            this.shoppingListArray.push(shoppingList);
                            let strShoppingList = `${shoppingList.title}: ${shoppingList.quantity } ${shoppingList.unitMeasurement}. - успішно добавлено. Id обєкта: ${id}`;
                            return strShoppingList;
                    }
                    else{
                        throw new Error(`${shoppingList.title}: ___ ${shoppingList.unitMeasurement}. - Не добавлено. Причина невірно вказана кількість товару`);
                    }
                }
                else{
                    throw new Error(`_____ : ${shoppingList.quantity } ${shoppingList.unitMeasurement}. - Не добавлено. Причина невказана назва продукту`);
                }
            }
            else{
                throw new Error(`${shoppingList.title}: ${shoppingList.quantity } ${shoppingList.unitMeasurement}. - Не добавлено. Причина неможливо добавити быльше 5 товарів`);
            }
        }
        catch(error){
            return error.message;
        }
    }
    removeItem(id){
        let index = this.shoppingListArray.indexOf(this.shoppingListArray.find(item => item.id === id));
        this.shoppingListArray[index] = ``;
        return this.shoppingListArray = this.shoppingListArray.filter(item => item !== ``);
    }
}

const shop = new ShoppingList();

shop.addItem(`title1`, 1, `kg`);
shop.addItem(`title2`, 2, `mg`);
shop.addItem(`title3`, 3, `g`);
shop.addItem(`title4`, 0, `kg`);
shop.addItem(`title5`, 5, `mg`);
shop.addItem(`title6`, 6, `g`);
shop.addItem(`title7`, 7, `kg`);
shop.removeItem(1);
shop.removeItem(3);
shop.removeItem(7);


console.log(shop.shoppingListArray);

for (let index = 0; index < shop.shoppingListArray.length; index++) {
    const iterator = shop.shoppingListArray[index];
    for (const item of iterator) {
        console.log(item);
    }
    console.log(`-----------------------------------------------------------`);
}


