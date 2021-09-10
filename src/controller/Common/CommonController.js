const reqResponse = require('../../cors/responseHandler');
const fs = require('fs')
const csv = require('csv');
const filePath = './src/controller/Common/Resource/sample.csv';
const transformedPath = './src/controller/Common/Resource/newSample.csv';

module.exports = (modalMap, router) => {
    const Op = modalMap.Sequelize.Op;
    const userTbl = modalMap["user"];
    const bookingTbl = modalMap["booking"];
    const vendorTbl = modalMap["vendor"]
    
    const data = require('./Resource/Payload.json')

    const addBooking = async(req, res)=>{
        try{
            /*User Info**/
            let customerData = data ? data.customer : null
            let userInfo = {
                id :  customerData ? customerData.id: null,
                full_name : customerData ? customerData.fullName: null,
                mobile : customerData ? customerData.mobile: null,
                email : customerData ? customerData.email: null,
                /**Audit column */
                is_voided: false,
                is_enabled: true
            }
            /*Booking Info**/
            let sourceAddress = data.source ? data.source.address : null
            let destinationAddress = data.destination ? data.destination.address : null
            let bookingInfo = {
                user_id : customerData ? customerData.id: null,
                id  : data ? data.bookingId : null,
                booking_time : data ? data.bookingTime : null,
                pickup_time : data ? data.pickupTime : null,
                source : data.source.name,
                source_address :sourceAddress ? sourceAddress.address: null,
                source_location : sourceAddress ? sourceAddress.location: null,
                source_city : sourceAddress ? sourceAddress.city: null,
                source_state : sourceAddress ? sourceAddress.state: null,
                source_zip : sourceAddress ? sourceAddress.postalCode: null,
                source_country : sourceAddress ? sourceAddress.country: null,
                source_lat : data.source.latitude,
                source_lng : data.source.longitude,

                destination : data.destination.name,
                destination_address :destinationAddress ? destinationAddress.address: null,
                destination_location : destinationAddress ? destinationAddress.location: null,
                destination_city : destinationAddress ? destinationAddress.city: null,
                destination_state : destinationAddress ? destinationAddress.state: null,
                destination_zip : destinationAddress ? destinationAddress.postalCode: null,
                destination_country : destinationAddress ? destinationAddress.country :null,
                destination_lat : destinationAddress.coordinates.latitude,
                destination_lng : destinationAddress.coordinates.longitude,

                /**Audit Columns */
                is_voided: false,
                is_enabled: true
            }
             /*Vendor Info**/
             let vendorInfo = {
                id :  data.vendor ? data.vendor.id : null,
                name : data.vendor ? data.vendor.fullName: null,
                vehicle_number : data.vendor? data.vendor.vehicleNumber : null,
                vehicle_model : data.vendor ? data.vendor.vehicleModel : null,
                /**Audit column */
                is_voided: false,
                is_enabled: true
            }
            /**Check duplication of user */
            let if_exist = await userTbl.findOne({
                where : {
                    id : data.customer.id
                }
            })
            if(if_exist){
                res.status(400).send({
                    status : false,
                    message : 'Duplication of User Not Allowed'
                })
            }
            else{
                /**Insert into db */
                let result = userTbl.create(userInfo)
                let bookingData = bookingTbl.create(bookingInfo)
                let vendorData = vendorTbl.create(vendorInfo)
                res.status(200).send(reqResponse.sucessResponse(200, "Data Added Successfully"))
            }
        }
        catch(error){
            console.log('error');
            return res.status(400).send(reqResponse.errorResponse(400, error))
        }
    }

    const csvOperation = async(req, res)=>{
        await fs.createReadStream(filePath)
        .pipe(csv.parse({columns: true}))
        .pipe(csv.transform((input) => {
            delete input[' Unused'];
            return input;
        }))
        .pipe(csv.stringify({header: true}))
        .pipe(fs.createWriteStream(transformedPath))
        .on('end', async() => {
            res.status(200).send(reqResponse.sucessResponse(200, "New CSV File Generated Successfully", transformedPath))
        }).on('error', () => {
            return res.status(400).send(reqResponse.errorResponse(400, error))
        });
    }
    return {
        addBooking, csvOperation
    }
}