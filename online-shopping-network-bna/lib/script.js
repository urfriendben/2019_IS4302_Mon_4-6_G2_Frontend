/**
 * New script file
 */

/**
 * Supplier imports goods
 * @param {org.onlineshopping.basic.ImportGoods} imports
 * @transaction
 */
async function ImportGoods(imports) {
    if(imports.good.supplier != imports.supplier){
     throw new Error('You are not the supplier of this goods!'); 
    }
    if(imports.quantity <= 0){
     throw new Error('Quantity of goods imported must be more than 0!'); 
    }
    imports.good.quantity += imports.quantity;
    const assetRegistry = await getAssetRegistry('org.onlineshopping.basic.Goods');
    await assetRegistry.update(imports.good);
}

/**
 * Shipping partner or consumer closes an order after it is successfully delivered
 * @param {org.onlineshopping.basic.CloseOrder} close
 * @transaction
 */
async function CloseOrder(close) {
    if(close.shipment.shippingPartnerDelivery && close.shipment.consumerEndorsed){
    close.order.orderState = 'successful';
    }
  	else{
    	throw new Error('Order cannot be closed. Have not been endorsed!');
    }
    const assetRegistry = await getAssetRegistry('org.onlineshopping.basic.Order');
    await assetRegistry.update(close.order);
}

/**
 * Supplier creates goods
 * @param {org.onlineshopping.basic.CreateGoods} newGoods
 * @transaction
 */
async function CreateGoods(newGoods) {
    return getAssetRegistry('org.onlineshopping.basic.Goods')
    .then(function(result) {
        var factory = getFactory();
        var newAsset = factory.newResource(
        'org.onlineshopping.basic', 
        'Goods', 
        newGoods.goodsId); 
        newAsset.supplier = newGoods.supplier;
        newAsset.name = newGoods.name;
        newAsset.quantity = newGoods.quantity;
        newAsset.type = newGoods.type;
        newAsset.price = newGoods.price;
        //continue with property assignments and any logic you have
        //when you are done and everything looks good you can continue
        return result.add(newAsset);
     })
}

/**
 * Consumer makes an order
 * @param {org.onlineshopping.basic.MakeOrder} order
 * @transaction
 */
async function MakeOrder(order) {
    const assetRegistry = await getAssetRegistry('org.onlineshopping.basic.Order');
    let factory =getFactory();
    var newAsset=factory.newResource('org.onlineshopping.basic', 'Order', order.orderId);
    if(order.goods.length <= 0){
        throw new Error('Customer cannot create empty order!');
    }
    if(order.goods.length != order.quantity.length){
    	throw new Error('Goods and quantity do not match!');
    }
    var i;
    for(i=0;i<order.goods.length;i++){
        //build query
        //let q = buildQuery('SELECT org.onlineshopping.basic.Goods WHERE (goodsId == _$goodsId)'); 
        //execute the query
        //var goodsListing = await query(q, {goodsId: good.goodsId});
        if(order.goods[i].supplier != order.supplier){
         throw new Error('This supplier does not have this goods!'); 
        }
        if(order.goods[i].quantity == 0){
          throw new Error('Some goods are not available!');
        }
        else if(order.quantity[i] > order.goods[i].quantity){
          throw new Error('Some goods are not sufficient!');
        }
        //else{
           //selectedGood = goodsListing[0];
           //if(selectedGood.quantity < good.quantity){
               //throw new Error('Some goods are not sufficient!');
            //}
            //else{
            //selectedGood.quantity -= good.quantity;
            //const assetRegistry = await getAssetRegistry('org.onlineshopping.basic.Goods');
            //await assetRegistry.update(selectedGood);
            //}
        //}
    }
 	 var totalprice =0
    for(i=0;i<order.goods.length;i++){
    	order.goods[i].quantity -= order.quantity[i];
        
      	totalprice +=order.goods[i].price * order.quantity[i];
        const assetRegistry = await getAssetRegistry('org.onlineshopping.basic.Goods');
        await assetRegistry.update(order.goods[i]);
        
    }
  	order.totalPrice = totalprice;
    newAsset.goods = order.goods;
    newAsset.quantity = order.quantity;
    newAsset.supplier = order.supplier;
    newAsset.consumer = order.consumer;
    newAsset.totalPrice = order.totalPrice;
    newAsset.orderState = order.orderState;
        //continue with property assignments and any logic you have
        //when you are done and everything looks good you can continue
    await assetRegistry.add(newAsset);
}

/**
 * Supplier handover packaged good to shipping partner
 * @param {org.onlineshopping.basic.SupplierHandover} shipment
 * @transaction
 */
async function SupplierHandover(shipment) {   
    return getAssetRegistry('org.onlineshopping.basic.Shipment')
    .then(function(result) {
        var factory = getFactory();
        var newAsset = factory.newResource(
        'org.onlineshopping.basic', 
        'Shipment', 
        shipment.shipmentId); 
        newAsset.shippingPartner = shipment.shippingPartner;
        newAsset.supplier = shipment.supplier;
        newAsset.order = shipment.order;
        newAsset.size = shipment.size;
        newAsset.weight = shipment.weight;
        newAsset.supplierHandover = true;
        //continue with property assignments and any logic you have
        //when you are done and everything looks good you can continue
        return result.add(newAsset);
     })
    
}

/**
 * Shipping Partner endorse goods handover from supplier
 * @param {org.onlineshopping.basic.ShippingPartnerEndorseHandover} shipmentInTransit
 * @transaction
 */
async function ShippingPartnerEndorseHandover(shipmentInTransit) {   
    let shipment = shipmentInTransit.shipment;
    shipment.shippingPartnerHandoverEndorsed = true;
    if(shipment.supplierHandover && shipment.shippingPartnerHandoverEndorsed){
      shipment.shipmentState = "inTransit";
    }
  else{
    throw new Error('Shipping Partner cannot endorse this transaction!');
  }
    const assetRegistry = await getAssetRegistry('org.onlineshopping.basic.Shipment');
    await assetRegistry.update(shipment);
}

/**
 * Shipping partner deliver items to customer
 * @param {org.onlineshopping.basic.ShippingPartnerDelivery} shipmentInTransit
 * @transaction
 */
async function ShippingPartnerDelivery(shipmentInTransit) {   
        let shipment = shipmentInTransit.shipment;
        //if(shipment.shipmentState = "inTransit"){
  		if(shipment.supplierHandover && shipment.shippingPartnerHandoverEndorsed){
      shipment.shippingPartnerDelivery = true;
        }
  else{
    throw new Error('Shipping partner cannot deliver this item!');
  }
    const assetRegistry = await getAssetRegistry('org.onlineshopping.basic.Shipment');
    await assetRegistry.update(shipment);
  
}

/**
 * Customer endorse item delivery from shipping partner
 * @param {org.onlineshopping.basic.ConsumerEndorseDelivery} shipmentInTransit
 * @transaction
 */
async function ConsumerEndorseDelivery(shipmentInTransit) {   
    let shipment = shipmentInTransit.shipment;
    shipment.consumerEndorsed = true;
    if(shipment.shippingPartnerDelivery && shipment.consumerEndorsed){
      shipment.shipmentState = "delivered";
    }
  else{
    throw new Error('Customer cannot endorse this transaction!');
  }
    const assetRegistry = await getAssetRegistry('org.onlineshopping.basic.Shipment');
    await assetRegistry.update(shipment);
}