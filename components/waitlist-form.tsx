"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    jQuery?: any;
    $?: any;
  }
}

// Validation functions - exposed globally for form handlers
function validateEmail7158022000000589156() {
    const form = document.forms["WebToContacts7158022000000589156" as any];
    if (!form) return true;

    const emailFld = form.querySelectorAll("[ftype=email]");
    for (let i = 0; i < emailFld.length; i++) {
      const emailInput = emailFld[i] as HTMLInputElement;
      const emailVal = emailInput.value;
      if (emailVal.replace(/^\s+|\s+$/g, "").length !== 0) {
        const atpos = emailVal.indexOf("@");
        const dotpos = emailVal.lastIndexOf(".");
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= emailVal.length) {
          alert("Please enter a valid email address.");
          emailInput.focus();
          return false;
        }
      }
    }
    return true;
  }

function checkMandatory7158022000000589156() {
    const mndFileds = ["First Name", "Last Name", "Email"];
    const fldLangVal = ["First Name", "Last Name", "Email"];
    const form = document.forms["WebToContacts7158022000000589156" as any];

    if (!form) return false;

    for (let i = 0; i < mndFileds.length; i++) {
      const fieldObj = form[mndFileds[i]] as HTMLInputElement | HTMLSelectElement;
      if (fieldObj) {
        if ((fieldObj.value as string).replace(/^\s+|\s+$/g, "").length === 0) {
          if (fieldObj.type === "file") {
            alert("Please select a file to upload.");
            fieldObj.focus();
            return false;
          }
          alert(fldLangVal[i] + " cannot be empty");
          fieldObj.focus();
          return false;
        } else if (fieldObj.nodeName === "SELECT") {
          const select = fieldObj as HTMLSelectElement;
          if (select.options[select.selectedIndex].value === "-None-") {
            alert(fldLangVal[i] + " cannot be none");
            fieldObj.focus();
            return false;
          }
        } else if (fieldObj.type === "checkbox") {
          const checkbox = fieldObj as HTMLInputElement;
          if (!checkbox.checked) {
            alert("Please accept " + fldLangVal[i]);
            fieldObj.focus();
            return false;
          }
        }
      }
    }

    if (!validateEmail7158022000000589156()) {
      return false;
    }

    const urlparams = new URLSearchParams(window.location.search);
    if (urlparams.has("service") && urlparams.get("service") === "smarturl") {
      const webform = document.getElementById("webform7158022000000589156");
      const service = urlparams.get("service");
      if (webform && service) {
        const smarturlfield = document.createElement("input");
        smarturlfield.setAttribute("type", "hidden");
        smarturlfield.setAttribute("value", service);
        smarturlfield.setAttribute("name", "service");
        webform.appendChild(smarturlfield);
      }
    }

    return true;
}

// Expose functions globally
if (typeof window !== "undefined") {
  (window as any).validateEmail7158022000000589156 = validateEmail7158022000000589156;
  (window as any).checkMandatory7158022000000589156 = checkMandatory7158022000000589156;
}

export function WaitlistForm() {
  useEffect(() => {
    // Load jQuery if not already loaded
    if (typeof window !== "undefined" && !window.jQuery) {
      const script = document.createElement("script");
      script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js";
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.jQuery) {
          initializeForm();
        }
      };
    } else if (window.jQuery) {
      initializeForm();
    }

    function initializeForm() {
      const $ = window.jQuery || window.$;
      if (!$) return;

      $("#webform7158022000000589156").on("submit", function (this: HTMLFormElement, e: any) {
        const ismandatory = checkMandatory7158022000000589156();
        e.preventDefault();

        if (ismandatory) {
          const formData = new FormData(this);
          const submitButton = document.querySelector(
            ".crmWebToEntityForm .formsubmit"
          ) as HTMLButtonElement;
          if (submitButton) submitButton.disabled = true;

          $.ajax({
            url: "https://crm.zoho.com/crm/WebToContactForm",
            type: "POST",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data: any) {
              const splashinfodom = document.getElementById("wf_splash_info");
              const splashdom = document.getElementById("wf_splash");
              const form = document.getElementById(
                "webform7158022000000589156"
              ) as HTMLFormElement;

              if (splashinfodom) splashinfodom.innerText = data.actionvalue;
              if (splashdom) splashdom.style.display = "";
              if (form) form.reset();

              setTimeout(function () {
                if (splashdom) splashdom.style.display = "none";
              }, 5000);

              if (submitButton) submitButton.disabled = false;
            },
            error: function () {
              alert("An error occurred. Please try again.");
              const submitButton = document.querySelector(
                ".crmWebToEntityForm .formsubmit"
              ) as HTMLButtonElement;
              if (submitButton) submitButton.disabled = false;
            }
          });
        }
      });
    }
  }, []);

  return (
    <>
      <style jsx global>{`
        .wf_customMessageBox {
          font-family: var(--font-geist), Arial, Helvetica, sans-serif;
          color: #f7f7f7;
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(20px);
          box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.25);
          max-width: 90%;
          width: max-content;
          word-break: break-word;
          z-index: 11000;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          min-width: 100px;
          padding: 10px 15px;
          display: flex;
          align-items: center;
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translate(-50%, 0);
        }

        .wf_customCircle {
          position: relative;
          background-color: #12aa67;
          border-radius: 100%;
          width: 20px;
          height: 20px;
          flex: none;
          margin-right: 7px;
        }

        .wf_customCheckMark {
          box-sizing: unset !important;
          position: absolute;
          transform: rotate(45deg) translate(-50%, -50%);
          left: 6px;
          top: 9px;
          height: 8px;
          width: 3px;
          border-bottom: 2px solid #fff;
          border-right: 2px solid #fff;
        }

        .wf_customClose {
          box-sizing: border-box;
          position: relative;
          width: 18px;
          height: 18px;
        }

        .wf_customClose::after,
        .wf_customClose::before {
          content: "";
          display: block;
          box-sizing: border-box;
          position: absolute;
          width: 12px;
          height: 1.5px;
          background: #616e88;
          transform: rotate(45deg);
          border-radius: 5px;
          top: 8px;
          left: 3px;
        }

        .wf_customClose::after {
          transform: rotate(-45deg);
        }

        #crmWebToEntityForm.zcwf_lblLeft {
          width: 100%;
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }

        #crmWebToEntityForm.zcwf_lblLeft * {
          box-sizing: border-box;
        }

        #crmWebToEntityForm {
          text-align: left;
        }

        #crmWebToEntityForm * {
          direction: ltr;
        }

        .zcwf_lblLeft .zcwf_title {
          word-wrap: break-word;
          padding: 0 0 20px 0;
          font-weight: 600;
          font-size: 24px;
          color: #f7f7f7;
          font-family: var(--font-geist), Arial, sans-serif;
        }

        .zcwf_lblLeft .zcwf_row {
          margin: 20px 0;
        }

        .zcwf_lblLeft .zcwf_col_lab {
          width: 100%;
          word-break: break-word;
          padding: 0 0 8px 0;
          margin: 0;
          float: none;
          min-height: 1px;
        }

        .zcwf_lblLeft .zcwf_col_lab label {
          font-size: 14px;
          font-family: var(--font-geist), Arial, sans-serif;
          color: #a1a1aa;
          font-weight: 400;
        }

        .zcwf_lblLeft .zcwf_col_fld {
          float: none;
          width: 100%;
          padding: 0;
          position: relative;
          margin-top: 0;
        }

        .zcwf_lblLeft .zcwf_col_fld input[type="text"],
        .zcwf_lblLeft .zcwf_col_fld input[type="email"],
        .zcwf_lblLeft .zcwf_col_fld textarea {
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          background: rgba(0, 0, 0, 0.4) !important;
          color: #f7f7f7 !important;
          resize: vertical;
          border-radius: 16px;
          float: none;
          padding: 12px 16px;
          font-size: 14px;
          font-family: var(--font-geist), Arial, sans-serif;
          transition: all 0.2s;
        }

        .zcwf_lblLeft .zcwf_col_fld input[type="text"]:focus,
        .zcwf_lblLeft .zcwf_col_fld input[type="email"]:focus,
        .zcwf_lblLeft .zcwf_col_fld textarea:focus {
          outline: none;
          border-color: rgba(255, 255, 255, 0.4) !important;
          background: rgba(0, 0, 0, 0.6) !important;
        }

        .zcwf_lblLeft .zcwf_col_fld input::placeholder,
        .zcwf_lblLeft .zcwf_col_fld textarea::placeholder {
          color: #71717a;
        }

        .zcwf_lblLeft .zcwf_col_help {
          float: none;
          margin-left: 0;
          margin-top: 4px;
          font-size: 12px;
          max-width: 100%;
          word-break: break-word;
        }

        .zcwf_lblLeft .formsubmit {
          margin-right: 12px;
          cursor: pointer;
          color: #000 !important;
          font-size: 14px;
          font-weight: 600;
          font-family: var(--font-geist), Arial, sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          border: none !important;
          padding: 12px 24px;
          border-radius: 9999px;
          background: #fff !important;
          transition: all 0.2s;
          width: auto;
          min-width: 160px;
        }

        .zcwf_lblLeft .formsubmit:hover:not(:disabled) {
          background: #e4e4e7 !important;
        }

        .zcwf_lblLeft .formsubmit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .zcwf_lblLeft .zcwf_button[type="reset"] {
          font-size: 14px;
          color: #a1a1aa;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: transparent;
          padding: 12px 24px;
          border-radius: 9999px;
          cursor: pointer;
          max-width: none;
          overflow: visible;
          text-overflow: unset;
          white-space: normal;
          font-family: var(--font-geist), Arial, sans-serif;
          transition: all 0.2s;
        }

        .zcwf_lblLeft .zcwf_button[type="reset"]:hover {
          border-color: rgba(255, 255, 255, 0.2);
          color: #f7f7f7;
        }

        .zcwf_lblLeft .zcwf_privacy {
          padding: 6px 0;
        }

        .zcwf_lblLeft .wfrm_fld_dpNn {
          display: none;
        }

        .dIB {
          display: inline-block;
        }

        .zcwf_lblLeft .zcwf_row:after,
        .zcwf_lblLeft .zcwf_col_fld:after {
          content: "";
          display: table;
          clear: both;
        }

        @media all and (max-width: 600px) {
          .zcwf_lblLeft .zcwf_col_lab,
          .zcwf_lblLeft .zcwf_col_fld {
            width: 100%;
            float: none !important;
          }

          .zcwf_lblLeft .zcwf_col_help {
            width: 100%;
          }
        }
      `}</style>

      <div
        id="crmWebToEntityForm"
        className="zcwf_lblLeft crmWebToEntityForm"
        style={{ background: "transparent", color: "#f7f7f7" }}
      >
        <div className="wf_customMessageBox" id="wf_splash" style={{ display: "none" }}>
          <div className="wf_customCircle">
            <div className="wf_customCheckMark"></div>
          </div>
          <span id="wf_splash_info"></span>
        </div>

        <form
          id="webform7158022000000589156"
          name="WebToContacts7158022000000589156"
          acceptCharset="UTF-8"
        >
          <input
            type="hidden"
            name="xnQsjsdp"
            defaultValue="95a95a4bb7738aeaecffdf116e431bdd88a7928ef095043cf95c642ad18d275f"
            readOnly
          />
          <input type="hidden" name="zc_gad" id="zc_gad" defaultValue="" readOnly />
          <input
            type="hidden"
            name="xmIwtLD"
            defaultValue="a050cf308389436d7894f5f8eab10b10bf2f5046ea61c1c789b2cfd9054e257b378b90ee8a4725b1c4added65b8f91ff"
            readOnly
          />
          <input
            type="hidden"
            name="actionType"
            defaultValue="Q29udGFjdHM="
            readOnly
          />
          <input type="hidden" name="returnURL" defaultValue="null" readOnly />
          <input
            type="hidden"
            name="aG9uZXlwb3Q"
            defaultValue=""
            readOnly
          />

          {/* <div className="zcwf_title">SLC Early Access</div> */}

          <div className="zcwf_row">
            <div className="zcwf_col_lab">
              <label htmlFor="First_Name">
                First Name
                <span style={{ color: "#ef4444" }}> *</span>
              </label>
            </div>
            <div className="zcwf_col_fld">
              <input
                type="text"
                id="First_Name"
                aria-required="true"
                aria-label="First Name"
                name="First Name"
                aria-valuemax={40}
                maxLength={40}
              />
              <div className="zcwf_col_help"></div>
            </div>
          </div>

          <div className="zcwf_row">
            <div className="zcwf_col_lab">
              <label htmlFor="Last_Name">
                Last Name
                <span style={{ color: "#ef4444" }}> *</span>
              </label>
            </div>
            <div className="zcwf_col_fld">
              <input
                type="text"
                id="Last_Name"
                aria-required="true"
                aria-label="Last Name"
                name="Last Name"
                aria-valuemax={80}
                maxLength={80}
              />
              <div className="zcwf_col_help"></div>
            </div>
          </div>

          <div className="zcwf_row">
            <div className="zcwf_col_lab">
              <label htmlFor="Email">
                Email
                <span style={{ color: "#ef4444" }}> *</span>
              </label>
            </div>
            <div className="zcwf_col_fld">
              <input
                type="email"
                {...({ ftype: "email" } as any)}
                autoComplete="false"
                id="Email"
                aria-required="true"
                aria-label="Email"
                name="Email"
                aria-valuemax={100}
                maxLength={100}
              />
              <div className="zcwf_col_help"></div>
            </div>
          </div>

          <div className="zcwf_row">
            <div className="zcwf_col_lab"></div>
            <div className="zcwf_col_fld">
              <input
                type="submit"
                id="formsubmit"
                role="button"
                className="formsubmit zcwf_button"
                value="Get Early Access"
                aria-label="Submit"
                title="Submit"
              />
              <input
                type="reset"
                className="zcwf_button"
                role="button"
                name="reset"
                value="Reset"
                aria-label="Reset"
                title="Reset"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
