import { LightningElement, api } from "lwc";

export default class ApoAlertDemo extends LightningElement {
  @api
  content = "content";

  @api
  alertContent = "alert content";
}
