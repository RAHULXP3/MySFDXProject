import { LightningElement, api } from "lwc";
import ADS_ICONS from "@salesforce/resourceUrl/assets";
import { classSet } from "c/utils";
import { loadStyle } from "lightning/platformResourceLoader";
import GLOBAL_STYLES from "@salesforce/resourceUrl/assets";

export default class ApoAlert extends LightningElement {
  state = {
    hide: false,
    variant: "",
    icon: "information"
  };
  @api alertContent = "";
  @api multipleActions = false;
  @api linkLocation = "";
  @api
  get hide() {
    return this.state.hide;
  }
  set hide(value) {
    this.state.hide = value;
  }
  @api ariaLabel;
  @api ariaDescribedby;
  @api ariaControls;
  @api ariaExpanded;
  @api ariaLive;
  @api ariaAtomic;

  @api
  get variant() {
    return this.state.variant;
  }
  set variant(value) {
    this.state.variant = value;
  }

  get assistiveText() {
    switch (this.state.variant) {
      case "success":
      case "warning":
      case "error":
        return this.state.variant;
      default:
        return "info";
    }
  }

  get computedAlertMainClass() {
    const isVariant = ["success", "warning", "error"].includes(
      this.state.variant
    );
    return classSet("apo-alert apo-alert--no-border")
      .add({
        "apo-alert--multiple-actions": this.multipleActions,
        [`apo-alert--${this.state.variant}`]: isVariant,
        "apo-alert--info": !isVariant
      })
      .toString();
  }

  get textStyle() {
    if (this.state.variant === "standard" || this.state.variant === "info") {
      return "apo-alert__text--black";
    }
    return "apo-alert__text--white";
  }

  iconColor() {
    if (this.state.variant === "standard" || this.state.variant === "info") {
      return "black";
    }
    return "white";
  }

  get closeIcon() {
    return `${ADS_ICONS}/assets/icons/${this.iconColor()}/close.svg`;
  }

  get buttonStyle() {
    if (this.state.variant === "standard" || this.state.variant === "info") {
      return "apo-alert__text-button--black";
    }
    return "apo-alert__text-button--white";
  }

  get svgUrl() {
    let iconName = "";
    switch (this.state.variant) {
      case "standard":
        iconName = "information";
        break;
      case "success":
        iconName = "status-good";
        break;
      case "warning":
        iconName = "status-warning";
        break;
      case "error":
        iconName = "status-alert";
        break;
      default:
        iconName = "information";
    }
    return `${ADS_ICONS}/assets/icons/${this.iconColor()}/${iconName}.svg`;
  }

  destroy() {
    this.state.hide = true;
    const event = new CustomEvent("hidealert", {
      detail: this.state.hide
    });
    this.dispatchEvent(event);
  }

  routeView() {
    window.location.href = this.linkLocation;
  }
  constructor() {
    super();
    Promise.all([
      loadStyle(
        this,
        GLOBAL_STYLES + "/assets/global_styles/apo_styles.min.css"
      )
    ]).then(() => {});
  }
}
