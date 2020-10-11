export class MensajesPush
{
    
    constructor(){
        this.fecha = new Date();
    }

    fecha: Date;
    FechaCorta: string;
    
 /**
     * OneSignal notification UUID.
     */
    notificationID: string;
    /**
     * Title of the notification.
     */
    title: string;
    /**
     * Body of the notification.
     */
    body: string;
    /**
     * Custom additional data that was sent with the notification. Set on the dashboard under Options > Additional Data
     * or with the 'data' field on the REST API.
     */
    additionalData?: any;
  
   
}