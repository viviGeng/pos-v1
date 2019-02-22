
module.exports = function printInventory(inputs) {
    var method = require("./datbase.js")
    var all_items=method.loadAllItems();
    var promotions=method.loadPromotions();
    // console.log("Debug Info");
    var items=[];
    inputs.forEach(element => {
        if(element.split('-').length == 1){
            var Item=all_items.find(ele=>ele.barcode==element);
            var Quantity=1;
        }
        else{
            var Item=all_items.find(ele=>ele.barcode==element.split('-')[0]);
            var Quantity=element.split('-')[1];
        }
        var Name=Item.name;
        var Unit=Item.unit;
        var Price=Item.price;
        var Barcode=element;
        if(items.find(ele=>ele.name==Name)!= undefined){
            items.find(ele=>ele.name==Name).quantity += Quantity;
        }
        else{
            item = new Array();
            item.name=Name;
            item.quantity=Quantity;
            item.unit=Unit;
            item.price=Price.toFixed(2);
            item.barcode=Barcode;
            items.push(item);
        }
    });
    var result='***<没钱赚商店>购物清单***\n';
    var sendList=[];
    var total_price=0;
    var saved_money=0;
    items.forEach(item=>{
        var item_total_price=item.quantity*item.price;
        if(promotions[0].barcodes.find(ele=>ele==item.barcode) != undefined){
            sendItem=new Array();
            sendItem.name=item.name;
            sendItem.quantity=Math.floor(item.quantity/3);
            sendItem.unit=item.unit;
            saved_money+=sendItem.quantity*item.price;
            sendList.push(sendItem);
            item_total_price-=sendItem.quantity*item.price;
        }
            total_price += item_total_price;
            item_total_price=item_total_price.toFixed(2);
            result +=`名称：${item.name}，数量：${item.quantity}${item.unit}，单价：${item.price}(元)，小计：${item_total_price}(元)\n`;
    })
    total_price=total_price.toFixed(2);
    saved_money=saved_money.toFixed(2);
    result +='----------------------\n'+'挥泪赠送商品：\n';
    sendList.forEach(sendItem=>{
        result +=`名称：${sendItem.name}，数量：${sendItem.quantity}${sendItem.unit}\n`
    })
    result +=
    '----------------------\n' +
    `总计：${total_price}(元)\n` +
    `节省：${saved_money}(元)\n` +
    '**********************';
    console.log(result);
};