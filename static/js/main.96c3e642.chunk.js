(this["webpackJsonpcowin-notif"]=this["webpackJsonpcowin-notif"]||[]).push([[0],{251:function(e,t,a){},252:function(e,t,a){},274:function(e,t){},276:function(e,t){},286:function(e,t){},288:function(e,t){},315:function(e,t){},316:function(e,t){},321:function(e,t){},323:function(e,t){},330:function(e,t){},349:function(e,t){},406:function(e,t,a){"use strict";a.r(t);var i=a(0),n=a.n(i);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var c=a(23),o=a.n(c),s=(a(251),a(29)),r=a.n(s),l=a(50),u=a(113),g=a(114),h=a(244),j=a(241),y=(a(252),a(425)),M=a(424),I=a(428),d=a(427),b=a(245),p=a(431),x=a(433),A=a(429),N=a(69),f=a(432),D=a(430),O=a(133),T=a(56),k=a.n(T),v=a(426),E=a(159),S=a.n(E),m="https://cdn-api.co-vin.in/api",L=parseInt(localStorage.pollFreq)||520,w=function(){function e(){Object(u.a)(this,e)}return Object(g.a)(e,[{key:"req",value:function(e){return new Promise((function(t,a){k.a.get(e).then((function(e){return t(e.data)})).catch((function(e){return a(e)}))}))}},{key:"init",value:function(e,t){var a=this;return new v.a((function(i){var n=a.req.bind(a);a.watcher=setInterval((function(){n("".concat("https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByPin","?pincode=").concat(e,"&date=").concat(t)).then((function(e){i.next(e)})).catch((function(e){i.error(e)}))}),L)}))}},{key:"initDist",value:function(e,t){var a=this;return new v.a((function(i){var n=a.req.bind(a),c=function(){n("".concat("https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict","?district_id=").concat(e,"&date=").concat(t)).then((function(e){i.next(e)})).catch((function(e){i.error(e)}))};c(),a.watcher=setInterval(c,L)}))}},{key:"clearWatch",value:function(){console.log(this),clearInterval(this.watcher)}},{key:"clearAuthWatch",value:function(){clearInterval(this.authWatcher)}},{key:"generateOtp",value:function(){var e=Object(l.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.a.post("https://cdn-api.co-vin.in/api/v2/auth/generateMobileOTP",{mobile:t,secret:"U2FsdGVkX19mD56KTNfQsZgXJMwOG7u/6tuj0Qvil1LEjx783oxHXGUTDWYm+XMYVGXPeu+a24sl5ndEKcLTUQ=="}).then((function(e){return e.data})).catch((function(e){throw e}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"verifyOtp",value:function(){var e=Object(l.a)(r.a.mark((function e(t,a){var i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=S.a.SHA256(t).toString(S.a.enc.Hex),console.log(i),e.next=4,k.a.post("https://cdn-api.co-vin.in/api/v2/auth/validateMobileOtp",{otp:i,txnId:a}).then((function(e){return console.log(e),e.data})).catch((function(e){return console.log(e)}));case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"getBenefeciaries",value:function(){var e=Object(l.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.a.get("https://cdn-api.co-vin.in/api/v2/appointment/beneficiaries",{headers:{"content-type":"application/json",authorization:"Bearer ".concat(localStorage.token)}}).then((function(e){return e.data.beneficiaries})).catch((function(e){throw e}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"book",value:function(){var e=Object(l.a)(r.a.mark((function e(t,a){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.a.post("https://cdn-api.co-vin.in/api/v2/appointment/schedule",t,{headers:{"content-type":"application/json",authorization:"Bearer ".concat(localStorage.token)}}).then((function(e){return e.data})).catch((function(e){throw e}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"trackAuth",value:function(e){var t=this;return new v.a((function(a){var i=t.getBenefeciaries.bind(t);t.authWatcher=setInterval((function(){i(e).then((function(e){a.next(e)})).catch((function(e){a.next("err")}))}),1e4)}))}},{key:"getStates",value:function(){var e=Object(l.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",k.a.get("".concat(m,"/v2/admin/location/states")).then((function(e){return e.data})).catch((function(e){throw e})));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"getDistricts",value:function(){var e=Object(l.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",k.a.get("".concat(m,"/v2/admin/location/districts/").concat(t)).then((function(e){return e.data.districts})).catch((function(e){throw e})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"getCaptcha",value:function(){var e=Object(l.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.a.post("https://cdn-api.co-vin.in/api/v2/auth/getRecaptcha",{},{headers:{"content-type":"application/json",authorization:"Bearer ".concat(localStorage.token)}}).then((function(e){return e.data})).catch((function(e){throw e}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}]),e}(),C=a.p+"static/media/wallet.bc6f0cd6.png",z=a(231),B=a(160),Y=a.n(B),Q=a(412),_=a(413),W=a(414),U=a(415),P=a(416),G=a(417),Z=a(418),H=a(419),F=a(420),V=a(421),J=a(422),X=a(423),R=a(5),q=y.a.Text,K=M.a.TabPane,$=new w,ee=I.a.Search,te=d.a.Option,ae={text:"Use this link to track vaccine availability and automatically book a slot for you and your family.",title:"Automated vaccine booking and availability tracking",tags:["covid19vaccines","covid19help","vaccination2021","covid19india"],url:window.location.href.indexOf("localhost")?"https://yashwanthm.github.io/cowin-vaccine-booking/":window.location.href},ie=document.getElementsByTagName("meta"),ne=ie[ie.length-1].getAttribute("build-version"),ce=function(e){Object(h.a)(a,e);var t=Object(j.a)(a);function a(e){var i;Object(u.a)(this,a),(i=t.call(this,e)).bookingError=function(e,t){b.a.error({message:e,description:t})},i.bookingIntervals=[],setInterval((function(){i.bookingIntervals.map((function(e){clearInterval(e)}))}),1e3);var n={isWatchingAvailability:!1,vaccineType:"ANY",bookingInProgress:!1,isAuthenticated:!!localStorage.token,minAge:18,districtId:null,stateId:null,beneficiaries:[],selectedBeneficiaries:[],otpData:{txnId:null},vaccineCalendar:{},zip:null,enableOtp:!1,otp:null,mobile:null,feeType:"Any",token:localStorage.token||null,selectedTab:"1",dates:[],states:[],dose:1,districs:[],session:null,showCaptcha:!1,captcha:null,bookingCaptcha:null,bookingCenter:null,showSuccessModal:!1};return localStorage.appData&&(n=Object.assign(n,JSON.parse(localStorage.appData))),localStorage.token&&(n.token=localStorage.token,n.isAuthenticated=!0,n.enableOtp=!1),i.state=n,i}return Object(g.a)(a,[{key:"waitForOtp",value:function(){var e=Object(l.a)(r.a.mark((function e(){var t,a=this;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("waiting for otp"),this.ac&&this.ac.abort(),!("OTPCredential"in window)){e.next=17;break}return console.log("Waiting for SMS. Try sending yourself a following message:\n\nYour verification code is: 123ABC\n\n@whatwebcando.today #123ABC"),e.prev=4,this.ac=new AbortController,e.next=8,navigator.credentials.get({otp:{transport:["sms"]},signal:this.ac.signal}).then((function(e){console.log("otp is ",e),console.log("otp, ".concat(e)),a.setState({otp:e})})).catch((function(e){console.log("ssss ".concat(e))}));case 8:t=e.sent,console.log(t),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(4),console.log(e.t0);case 15:e.next=18;break;case 17:console.log("Web OTP API not supported");case 18:case"end":return e.stop()}}),e,this,[[4,12]])})));return function(){return e.apply(this,arguments)}}()},{key:"getBeneficiaries",value:function(){var e=this;$.getBenefeciaries(this.state.token).then((function(t){e.setState({beneficiaries:t},(function(){e.setStorage()}))})).catch((function(t){console.log(t),delete localStorage.token,e.setState({isAuthenticated:!1,token:null,enableOtp:!1},(function(){e.state.mobile}))}))}},{key:"speak",value:function(e){var t=new SpeechSynthesisUtterance;t.lang="en-UK",t.volume=1,t.rate=1,t.pitch=1,t.text=e,window.speechSynthesis.speak(t)}},{key:"componentDidMount",value:function(){var e=this;this.notifSound=document.getElementById("notif");var t=localStorage.token||this.state.token;t&&(this.getBeneficiaries(),this.trackAuth(t)),$.getStates().then((function(t){e.setState({states:t.states},(function(){e.selectState(e.state.stateId),e.selectDistrict(e.state.districtId)}))})).catch((function(e){console.log(e)}));try{Notification.requestPermission((function(e){console.log("Notification permission status:",e)}))}catch(i){console.log(i)}var a={title:"Vaccine Notifications Enabled",body:"You now have notifications active for Covid vaccine availability",native:!0,vibrate:[300,100,400]};try{Notification.requestPermission((function(e){"granted"===e&&navigator.serviceWorker.ready.then((function(e){e.showNotification(a.title,a)}))})),new Notification(a.title,a)}catch(i){console.log(i)}}},{key:"setStorage",value:function(){var e=Object.assign({},this.state);delete e.enableOtp,delete e.vaccineCalendar,delete e.isWatchingAvailability,localStorage.appData=JSON.stringify(e)}},{key:"componentWillUnmount",value:function(){this.setStorage(),this.watcher&&this.watcher.unsubscribe()}},{key:"handleNotification",value:function(){var e=this,t=this.state.vaccineCalendar.centers,a=1;this.state.selectedBeneficiaries&&Array.isArray(this.state.selectedBeneficiaries)&&this.state.selectedBeneficiaries.length>0&&(a=this.state.selectedBeneficiaries.length);var i=!1;t.map((function(t){t.sessions.map((function(n){if(parseInt(n.min_age_limit)===e.state.minAge&&parseInt(n.available_capacity)>=a&&!e.state.bookingInProgress){var c=e.state.vaccineType;if("ANY"!==c&&c!==n.vaccine)return;if(e.state.feeType&&"Any"!==e.state.feeType&&e.state.feeType!==t.fee_type)return;var o={title:t.name,body:"".concat(t.pincode," ").concat(t.address," has ").concat(n.available_capacity," on ").concat(n.date),vibrate:[300,100,400],native:!0};try{Notification.requestPermission((function(e){"granted"===e&&navigator.serviceWorker.ready.then((function(e){e.showNotification(o.message,o)}))})),new Notification(o.title,o),e.speak("Vaccines available at ".concat(t.name)),e.state.isAuthenticated&&e.setState({bookingInProgress:!0,bookingCenter:t,bookingSession:n},(function(){e.state.bookingCaptcha||i||(e.getCaptcha(),i=!0,e.clearWatch())}))}catch(s){console.log(s)}}}))}))}},{key:"getCaptcha",value:function(){var e=this;this.setState({bookingInProgress:!0},(function(){$.getCaptcha().then((function(t){e.speak("Enter captcha to verify and proceed booking"),e.setState({captcha:t.captcha,showCaptcha:!0},(function(){}))})).catch((function(t){console.log("error getting captcha ",t),e.setState({bookingInProgress:!1})}))}))}},{key:"book",value:function(){var e=Object(l.a)(r.a.mark((function e(t){var a,i,n,c=this;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("book"),a=[],i=this.state.bookingSession,0!==this.state.selectedBeneficiaries.length){e.next=8;break}return this.state.isAuthenticated||this.setState({enableOtp:!0},(function(){c.generateOtp()})),e.abrupt("return");case 8:this.state.selectedBeneficiaries.map((function(e){a.push(e.beneficiary_reference_id)}));case 9:n={dose:this.state.dose?parseInt(this.state.dose):1,session_id:i.session_id,slot:i.slots[Math.floor(Math.random()*i.slots.length)],beneficiaries:a,captcha:this.state.bookingCaptcha},$.book(n,this.state.token).then((function(e){console.log("Booking success ",e.appointment_id),c.clearWatch(),c.setState({bookingInProgress:!1,appointment_id:JSON.stringify(e),showSuccessModal:!0})})).catch((function(e){c.setState({bookingInProgress:!1,session:null,bookingCenter:null,captcha:null,bookingSession:null,bookingCaptcha:null,showCaptcha:!1});var t="Booking did not get through. ";c.bookingError(t,"The availability probably ran out before you could take an action. You can refresh if needed. Otherwise the app will continue to look for slots."),console.log(t)}));case 11:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"initWatch",value:function(e){var t=this;this.setStorage(),this.setState({isWatchingAvailability:!0}),"1"===this.state.selectedTab?this.watcher=$.initDist(this.state.districtId,Y()().format("DD-MM-YYYY")).subscribe({next:function(e){t.setState({vaccineCalendar:e},(function(){t.handleNotification()}))},error:function(e){console.error("something wrong occurred: "+e)},complete:function(){console.log("done"),this.setState({isWatchingAvailability:!1})}}):this.watcher=$.init(this.state.zip,Y()().format("DD-MM-YYYY")).subscribe({next:function(e){t.setState({vaccineCalendar:e},(function(){t.handleNotification(),t.setStorage()}))},error:function(e){console.error("something wrong occurred: "+e)},complete:function(){console.log("done"),this.setState({isWatchingAvailability:!1})}})}},{key:"trackAuth",value:function(){var e=this;console.log("trackauth"),!1!==this.state.isAuthenticated&&(this.authWatch=$.trackAuth(this.state.token).subscribe({next:function(t){Array.isArray(t)?e.setState({beneficiaries:t}):(console.log("asasad"),$.clearAuthWatch(),delete localStorage.token,e.setState({isAuthenticated:!1,token:null},(function(){e.state.isWatchingAvailability&&(e.generateOtp(),e.speak("Session expired!"))})))},error:function(t){console.error("something wrong occurred: "+t),e.speak("Session expired!"),$.clearAuthWatch(),delete localStorage.token,e.setState({isAuthenticated:!1,token:null},(function(){e.state.isWatchingAvailability&&!e.state.enableOtp&&(e.generateOtp(),e.speak("Session expired!"))}))},complete:function(){console.log("done"),e.setState({isWatchingAvailability:!1})}}))}},{key:"clearWatch",value:function(){$.clearWatch(),this.setState({isWatchingAvailability:!1})}},{key:"renderTable",value:function(e){return Object(R.jsxs)("div",{children:[Object(R.jsx)("h2",{style:{marginTop:10},children:"Vaccination Centers & Availability Info"}),Object(R.jsx)(q,{type:"secondary",children:"You will see all kinds of availability below. But, the notifications and bookings will be done for your selected preferences only."}),Object(R.jsx)("table",{style:{marginTop:10},children:e.centers.map((function(e){return e.sessions.map((function(e){e.available_capacity>0&&!1})),Object(R.jsxs)("tr",{children:[Object(R.jsxs)("td",{children:[Object(R.jsx)("h3",{children:e.name}),Object(R.jsxs)("b",{children:["Fee: ",e.fee_type]}),Object(R.jsx)("br",{}),e.block_name,", ",e.address,", ",e.pincode,"."]}),e.sessions.map((function(e){return Object(R.jsxs)("td",{children:[Object(R.jsx)("h4",{children:e.date}),Object(R.jsx)("p",{children:e.vaccine}),Object(R.jsx)("div",{children:parseInt(e.available_capacity)>0?"".concat(e.available_capacity," shots available for ").concat(e.min_age_limit,"+"):"No Availability ".concat(e.min_age_limit)}),parseInt(e.available_capacity>0)?Object(R.jsxs)("div",{children:[Object(R.jsx)("b",{children:"Available Slots"}),e.slots.map((function(e){return Object(R.jsx)(p.a,{children:e})}))]}):null]},e.session_id)}))]},e.center_id)}))})]})}},{key:"setMinAge",value:function(e){this.setState({minAge:e.target.value})}},{key:"generateOtp",value:function(){var e=this;this.setState({enableOtp:!0},(function(){$.generateOtp(e.state.mobile).then((function(t){e.speak("One Time Password has been sent to your phone. Please enter."),e.setState({otpData:t,enableOtp:!0})})).catch((function(t){console.log(t),e.setState({enableOtp:!1})}))}))}},{key:"verifyOtp",value:function(){var e=this;$.verifyOtp(this.state.otp,this.state.otpData.txnId).then((function(t){localStorage.token=t.token,e.setState({token:t.token,isAuthenticated:!0,enableOtp:!1},(function(){e.setStorage(),e.getBeneficiaries(),e.trackAuth(t.token)}))})).catch((function(t){console.log(t),e.state.isAuthenticated&&(delete localStorage.appData,delete localStorage.token,e.setState({token:null,isAuthenticated:!1}))}))}},{key:"selectState",value:function(e){var t=this;this.setState({stateId:e},(function(){$.getDistricts(e).then((function(e){t.setState({districs:e})})).catch((function(e){console.log(e)}))}))}},{key:"selectDistrict",value:function(e){this.setState({districtId:e},(function(){}))}},{key:"renderCaptcha",value:function(){var e=this;return Object(R.jsxs)("div",{children:[Object(R.jsx)("h2",{style:{marginTop:10,marginBottom:0},children:"Enter Captcha"}),Object(R.jsxs)(p.a,{children:[Object(R.jsx)(x.a,{children:Object(z.a)(this.state.captcha)}),Object(R.jsx)(ee,{placeholder:"Enter Captcha",allowClear:!0,style:{width:300,marginTop:10},enterButton:"Submit & Book",size:"large",onSearch:function(t){console.log(t),e.setState({bookingCaptcha:t},(function(){e.book()}))}})]})]})}},{key:"renderModal",value:function(){var e=this;if(this.state.bookingSession&&this.state.bookingCenter)return Object(R.jsxs)(A.a,{mask:!0,maskClosable:!1,title:"Congrats!",visible:this.state.showSuccessModal,onOk:function(e){window.location="https://selfregistration.cowin.gov.in/dashboard"},onCancel:function(t){e.setState({bookingInProgress:!1,showSuccessModal:!1,bookingCenter:null,bookingSession:null,captcha:null,bookingCaptcha:null,showCaptcha:!1})},children:[Object(R.jsxs)("p",{children:["Your vaccination slot is booked for selected beneficiaries at"," ",this.state.bookingCenter.name,", ",this.state.bookingCenter.block_name,", ",this.state.bookingCenter.address,","," ",this.state.bookingCenter.district_name,","," ",this.state.bookingCenter.state_name,","," ",this.state.bookingCenter.pincode]}),Object(R.jsxs)("p",{children:["Your appointment id is ",this.state.appointment_id]}),Object(R.jsxs)("p",{children:["You can login into"," ",Object(R.jsx)("a",{href:"https://www.cowin.gov.in/home",target:"_blank",rel:"noreferrer",children:"Cowin"})," ","to see details of your vaccincation slot."]})]})}},{key:"render",value:function(){var e=this,t=this.state.vaccineCalendar,a=this.state.isAuthenticated,i=this.state,n=i.beneficiaries,c=i.selectedBeneficiaries;return Object(R.jsxs)("div",{className:"App",children:[Object(R.jsx)("audio",{id:"notif",children:Object(R.jsx)("source",{src:"https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"})}),Object(R.jsxs)("header",{className:"App-header",children:[Object(R.jsx)("h1",{children:"Covid-19 automatic vaccine bookings and notifications for availability."}),Object(R.jsxs)("p",{children:["This web-app can continously track for availability of vaccine and proceed with booking on your behalf if you are logged in. ",Object(R.jsx)("br",{}),Object(R.jsx)("b",{children:"The app does not store any of your personal information."})]}),Object(R.jsxs)("p",{style:{color:"#555"},children:["Please register on"," ",Object(R.jsx)("a",{href:"https://www.cowin.gov.in/home",target:"_blank",rel:"noreferrer",children:"Cowin"}),", ","add beneficiaries and then, come back here for automated bookings.",Object(R.jsx)("br",{}),"For automatic bookings, login, select beneficiaries, keep feeding in OTPs every few mins. When there's availability, the app will automatically attempt for a booking based on your preferences. When there's availability, you will have to enter captcha code. The app will speak out for any inputs(OTP and Captcha) required. For more information, please see the"," ",Object(R.jsx)("a",{href:"https://github.com/yashwanthm/cowin-vaccine-booking/wiki/Usage-Guide",target:"_blank",rel:"noreferrer",children:"Help/Usage Guide"}),Object(R.jsx)("br",{}),Object(R.jsx)("br",{}),"*Please be careful with the location selection as the booking can automatically happen at any center that has availability within your selected region.",Object(R.jsx)("br",{}),"*If you are on mobile, make sure that you keep the tab active and the auto screenlock is off.Tracking will be automatically paused unless your device has a way to keeping the app from pausing when it goes to background.",Object(R.jsx)("br",{}),"**There are limited number of slots opening up and it is running out almost instantly. Please keep feeding in OTPs when the session expires to input the captcha available to book as soon as there's availability. It takes time, it took me 2 days to get a slot.",Object(R.jsx)("br",{}),Object(R.jsxs)("b",{children:["This app now"," ",Object(R.jsx)("a",{href:"https://github.com/yashwanthm/cowin-vaccine-booking/issues/4",target:"_blank",rel:"noreferrer",children:"supports captcha/security code."})]})]})]}),Object(R.jsx)(p.a,{children:Object(R.jsxs)(x.a,{children:[a?null:Object(R.jsxs)("div",{children:[Object(R.jsx)("h2",{children:"Login"}),this.state.enableOtp?null:Object(R.jsx)(ee,{placeholder:this.state.mobile?this.state.mobile:"Mobile Number",allowClear:!0,type:"number",enterButton:"Generate OTP",size:"large",onSearch:function(t){e.setState({mobile:""===t?e.state.mobile:t,enableOtp:!0},(function(){e.generateOtp()}))}}),this.state.enableOtp?Object(R.jsxs)("span",{children:[Object(R.jsx)(ee,{placeholder:"Enter OTP",allowClear:!0,type:"number",enterButton:"Submit",size:"large",onSearch:function(t){e.setState({otp:t},(function(){e.verifyOtp()}))}}),Object(R.jsx)(N.a,{danger:!0,onClick:function(t){e.setState({enableOtp:!1})},type:"link",children:"Cancel"})]}):null]}),a?Object(R.jsxs)("div",{children:[Object(R.jsx)("h2",{children:"Beneficiaries"}),0===n.length?Object(R.jsxs)("p",{children:["You do not have any benificiares added yet. Please login to"," ",Object(R.jsx)("a",{href:"https://www.cowin.gov.in/home",target:"_blank",rel:"noreferrer",children:"Cowin"})," ","and add beneficiaries"]}):Object(R.jsx)("p",{children:"Select beneficiaries to book a slot automatically when there's availability. This app can continuously track availability and make a booking."}),this.state.beneficiaries.map((function(t){return Object(R.jsx)(p.a,{children:Object(R.jsx)(f.a,{disabled:e.state.isWatchingAvailability,checked:-1!==c.findIndex((function(e){return e.beneficiary_reference_id===t.beneficiary_reference_id})),onClick:function(a){var i=e.state.selectedBeneficiaries,n=i.findIndex((function(e){return e.beneficiary_reference_id===t.beneficiary_reference_id}));-1===n?i.push(t):i.splice(n,1),e.setState({selectedBeneficiaries:i})},children:t.name})})}))]}):null,Object(R.jsx)("h2",{style:{marginTop:14,marginBottom:0},children:"Booking Preferences"}),Object(R.jsxs)(p.a,{style:{marginTop:10},children:[Object(R.jsx)("h3",{style:{marginTop:10,marginBottom:0},children:"Vaccine Type"}),Object(R.jsxs)(D.a.Group,{style:{marginTop:12,marginLeft:10},onChange:function(t){e.setState({vaccineType:t.target.value})},value:this.state.vaccineType,disabled:this.state.isWatchingAvailability,children:[Object(R.jsx)(D.a,{value:"ANY",children:"Any"}),Object(R.jsx)(D.a,{value:"COVAXIN",children:"Covaxin"}),Object(R.jsx)(D.a,{value:"COVISHIELD",children:"Covishield"})]})]}),Object(R.jsxs)(p.a,{style:{marginTop:10},children:[Object(R.jsx)("h3",{style:{marginTop:10,marginBottom:0},children:"Age Group"}),Object(R.jsxs)(D.a.Group,{style:{marginTop:12,marginLeft:10},onChange:this.setMinAge.bind(this),value:this.state.minAge,disabled:this.state.isWatchingAvailability,children:[Object(R.jsx)(D.a,{value:18,children:"18 to 45 Years"}),Object(R.jsx)(D.a,{value:45,children:"45+ Years"})]})]}),Object(R.jsxs)(p.a,{style:{marginTop:10},children:[Object(R.jsx)("h3",{style:{marginTop:10,marginBottom:0},children:"Fee Type"}),Object(R.jsxs)(D.a.Group,{style:{marginTop:12,marginLeft:10},onChange:function(t){e.setState({feeType:t.target.value})},value:this.state.feeType,disabled:this.state.isWatchingAvailability,children:[Object(R.jsx)(D.a,{value:"Any",children:"Any"}),Object(R.jsx)(D.a,{value:"Free",children:"Free"}),Object(R.jsx)(D.a,{value:"Paid",children:"Paid"})]})]}),Object(R.jsxs)(p.a,{style:{marginTop:5},children:[Object(R.jsx)("h3",{style:{marginTop:10,marginBottom:0},children:"Dose"}),Object(R.jsxs)(D.a.Group,{style:{marginTop:12,marginLeft:10},onChange:function(t){e.setState({dose:t.target.value})},defaultValue:1,value:this.state.dose,disabled:this.state.isWatchingAvailability,children:[Object(R.jsx)(D.a,{value:1,children:"Dose 1"}),Object(R.jsx)(D.a,{value:2,children:"Dose 2"})]})]}),Object(R.jsx)("h2",{style:{marginTop:15,marginBottom:0},children:"Select Location for Tracking Availability"}),Object(R.jsxs)(M.a,{defaultActiveKey:this.state.selectedTab||"1",onChange:function(t){e.setState({selectedTab:t})},children:[Object(R.jsxs)(K,{tab:"Track By District",children:[Object(R.jsx)(d.a,{style:{width:234},size:"large",defaultValue:this.state.stateId,onChange:this.selectState.bind(this),placeholder:"Select State",children:this.state.states.map((function(e){return Object(R.jsx)(te,{value:e.state_id,children:e.state_name},e.state_id)}))}),Object(R.jsx)(d.a,{style:{width:234},defaultValue:this.state.districtId,size:"large",onChange:function(t){e.selectDistrict(t)},placeholder:"Select District",children:this.state.districs.map((function(e){return Object(R.jsx)(te,{value:e.district_id,children:e.district_name},e.district_id)}))}),Object(R.jsx)(N.a,{type:"primary",size:"large",loading:this.state.isWatchingAvailability,onClick:function(t){return e.initWatch()},children:this.state.isWatchingAvailability?"Tracking":this.state.isAuthenticated?"Track Availability & Book":"Track Availability"}),this.state.isWatchingAvailability?Object(R.jsx)(N.a,{type:"primary",icon:Object(R.jsx)(O.a,{}),size:"large",danger:!0,onClick:this.clearWatch.bind(this),children:"Stop"}):null]},1),Object(R.jsx)(K,{tab:"Track By Pincode",children:Object(R.jsxs)(p.a,{children:[Object(R.jsx)(ee,{disabled:this.state.isWatchingAvailability,placeholder:this.state.zip?this.state.zip:"Enter your area pincode",allowClear:!0,type:"number",enterButton:this.state.isWatchingAvailability?"Tracking":this.state.isAuthenticated?"Track Availability & Book":"Track Availability",size:"large",loading:this.state.isWatchingAvailability,onSearch:function(t){e.setState({zip:t,isWatchingAvailability:!0},(function(){e.initWatch()}))}}),this.state.isWatchingAvailability?Object(R.jsx)(N.a,{type:"primary",icon:Object(R.jsx)(O.a,{}),size:"large",danger:!0,onClick:this.clearWatch.bind(this),children:"Stop"}):null]})},2)]})]})}),this.state.showCaptcha?this.renderCaptcha():null,t&&t.centers?this.renderTable(t):null,Object(R.jsx)("h3",{style:{marginTop:15,marginBottom:0},children:"Donate"}),Object(R.jsx)("div",{children:Object(R.jsx)("a",{className:"paytm-button",href:"https://paytm.me/yV-4JXd",rel:"noreferrer",target:"_blank",children:"Donate with PayTM"})}),Object(R.jsxs)("div",{children:[Object(R.jsxs)("a",{className:"paypal-button",href:"https://paypal.me/YashwanthMaheshwaram?locale.x=en_GB",rel:"noreferrer",target:"_blank",children:[Object(R.jsx)("img",{className:"paypal-button-logo paypal-button-logo-pp paypal-button-logo-gold",src:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAyNCAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWluWU1pbiBtZWV0Ij4KICAgIDxwYXRoIGZpbGw9IiMwMDljZGUiIGQ9Ik0gMjAuOTA1IDkuNSBDIDIxLjE4NSA3LjQgMjAuOTA1IDYgMTkuNzgyIDQuNyBDIDE4LjU2NCAzLjMgMTYuNDExIDIuNiAxMy42OTcgMi42IEwgNS43MzkgMi42IEMgNS4yNzEgMi42IDQuNzEgMy4xIDQuNjE1IDMuNiBMIDEuMzM5IDI1LjggQyAxLjMzOSAyNi4yIDEuNjIgMjYuNyAyLjA4OCAyNi43IEwgNi45NTYgMjYuNyBMIDYuNjc1IDI4LjkgQyA2LjU4MSAyOS4zIDYuODYyIDI5LjYgNy4yMzYgMjkuNiBMIDExLjM1NiAyOS42IEMgMTEuODI1IDI5LjYgMTIuMjkyIDI5LjMgMTIuMzg2IDI4LjggTCAxMi4zODYgMjguNSBMIDEzLjIyOCAyMy4zIEwgMTMuMjI4IDIzLjEgQyAxMy4zMjIgMjIuNiAxMy43OSAyMi4yIDE0LjI1OCAyMi4yIEwgMTQuODIxIDIyLjIgQyAxOC44NDUgMjIuMiAyMS45MzUgMjAuNSAyMi44NzEgMTUuNSBDIDIzLjMzOSAxMy40IDIzLjE1MyAxMS43IDIyLjAyOSAxMC41IEMgMjEuNzQ4IDEwLjEgMjEuMjc5IDkuOCAyMC45MDUgOS41IEwgMjAuOTA1IDkuNSI+PC9wYXRoPgogICAgPHBhdGggZmlsbD0iIzAxMjE2OSIgZD0iTSAyMC45MDUgOS41IEMgMjEuMTg1IDcuNCAyMC45MDUgNiAxOS43ODIgNC43IEMgMTguNTY0IDMuMyAxNi40MTEgMi42IDEzLjY5NyAyLjYgTCA1LjczOSAyLjYgQyA1LjI3MSAyLjYgNC43MSAzLjEgNC42MTUgMy42IEwgMS4zMzkgMjUuOCBDIDEuMzM5IDI2LjIgMS42MiAyNi43IDIuMDg4IDI2LjcgTCA2Ljk1NiAyNi43IEwgOC4yNjcgMTguNCBMIDguMTczIDE4LjcgQyA4LjI2NyAxOC4xIDguNzM1IDE3LjcgOS4yOTYgMTcuNyBMIDExLjYzNiAxNy43IEMgMTYuMjI0IDE3LjcgMTkuNzgyIDE1LjcgMjAuOTA1IDEwLjEgQyAyMC44MTIgOS44IDIwLjkwNSA5LjcgMjAuOTA1IDkuNSI+PC9wYXRoPgogICAgPHBhdGggZmlsbD0iIzAwMzA4NyIgZD0iTSA5LjQ4NSA5LjUgQyA5LjU3NyA5LjIgOS43NjUgOC45IDEwLjA0NiA4LjcgQyAxMC4yMzIgOC43IDEwLjMyNiA4LjYgMTAuNTEzIDguNiBMIDE2LjY5MiA4LjYgQyAxNy40NDIgOC42IDE4LjE4OSA4LjcgMTguNzUzIDguOCBDIDE4LjkzOSA4LjggMTkuMTI3IDguOCAxOS4zMTQgOC45IEMgMTkuNTAxIDkgMTkuNjg4IDkgMTkuNzgyIDkuMSBDIDE5Ljg3NSA5LjEgMTkuOTY4IDkuMSAyMC4wNjMgOS4xIEMgMjAuMzQzIDkuMiAyMC42MjQgOS40IDIwLjkwNSA5LjUgQyAyMS4xODUgNy40IDIwLjkwNSA2IDE5Ljc4MiA0LjYgQyAxOC42NTggMy4yIDE2LjUwNiAyLjYgMTMuNzkgMi42IEwgNS43MzkgMi42IEMgNS4yNzEgMi42IDQuNzEgMyA0LjYxNSAzLjYgTCAxLjMzOSAyNS44IEMgMS4zMzkgMjYuMiAxLjYyIDI2LjcgMi4wODggMjYuNyBMIDYuOTU2IDI2LjcgTCA4LjI2NyAxOC40IEwgOS40ODUgOS41IFoiPjwvcGF0aD4KPC9zdmc+Cg",alt:"donate with paypal","aria-label":"pp"}),Object(R.jsx)("img",{className:"paypal-button-logo paypal-button-logo-paypal paypal-button-logo-gold",src:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjMyIiB2aWV3Qm94PSIwIDAgMTAwIDMyIiB4bWxucz0iaHR0cDomI3gyRjsmI3gyRjt3d3cudzMub3JnJiN4MkY7MjAwMCYjeDJGO3N2ZyIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pbllNaW4gbWVldCI+PHBhdGggZmlsbD0iIzAwMzA4NyIgZD0iTSAxMiA0LjkxNyBMIDQuMiA0LjkxNyBDIDMuNyA0LjkxNyAzLjIgNS4zMTcgMy4xIDUuODE3IEwgMCAyNS44MTcgQyAtMC4xIDI2LjIxNyAwLjIgMjYuNTE3IDAuNiAyNi41MTcgTCA0LjMgMjYuNTE3IEMgNC44IDI2LjUxNyA1LjMgMjYuMTE3IDUuNCAyNS42MTcgTCA2LjIgMjAuMjE3IEMgNi4zIDE5LjcxNyA2LjcgMTkuMzE3IDcuMyAxOS4zMTcgTCA5LjggMTkuMzE3IEMgMTQuOSAxOS4zMTcgMTcuOSAxNi44MTcgMTguNyAxMS45MTcgQyAxOSA5LjgxNyAxOC43IDguMTE3IDE3LjcgNi45MTcgQyAxNi42IDUuNjE3IDE0LjYgNC45MTcgMTIgNC45MTcgWiBNIDEyLjkgMTIuMjE3IEMgMTIuNSAxNS4wMTcgMTAuMyAxNS4wMTcgOC4zIDE1LjAxNyBMIDcuMSAxNS4wMTcgTCA3LjkgOS44MTcgQyA3LjkgOS41MTcgOC4yIDkuMzE3IDguNSA5LjMxNyBMIDkgOS4zMTcgQyAxMC40IDkuMzE3IDExLjcgOS4zMTcgMTIuNCAxMC4xMTcgQyAxMi45IDEwLjUxNyAxMy4xIDExLjIxNyAxMi45IDEyLjIxNyBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwMzA4NyIgZD0iTSAzNS4yIDEyLjExNyBMIDMxLjUgMTIuMTE3IEMgMzEuMiAxMi4xMTcgMzAuOSAxMi4zMTcgMzAuOSAxMi42MTcgTCAzMC43IDEzLjYxNyBMIDMwLjQgMTMuMjE3IEMgMjkuNiAxMi4wMTcgMjcuOCAxMS42MTcgMjYgMTEuNjE3IEMgMjEuOSAxMS42MTcgMTguNCAxNC43MTcgMTcuNyAxOS4xMTcgQyAxNy4zIDIxLjMxNyAxNy44IDIzLjQxNyAxOS4xIDI0LjgxNyBDIDIwLjIgMjYuMTE3IDIxLjkgMjYuNzE3IDIzLjggMjYuNzE3IEMgMjcuMSAyNi43MTcgMjkgMjQuNjE3IDI5IDI0LjYxNyBMIDI4LjggMjUuNjE3IEMgMjguNyAyNi4wMTcgMjkgMjYuNDE3IDI5LjQgMjYuNDE3IEwgMzIuOCAyNi40MTcgQyAzMy4zIDI2LjQxNyAzMy44IDI2LjAxNyAzMy45IDI1LjUxNyBMIDM1LjkgMTIuNzE3IEMgMzYgMTIuNTE3IDM1LjYgMTIuMTE3IDM1LjIgMTIuMTE3IFogTSAzMC4xIDE5LjMxNyBDIDI5LjcgMjEuNDE3IDI4LjEgMjIuOTE3IDI1LjkgMjIuOTE3IEMgMjQuOCAyMi45MTcgMjQgMjIuNjE3IDIzLjQgMjEuOTE3IEMgMjIuOCAyMS4yMTcgMjIuNiAyMC4zMTcgMjIuOCAxOS4zMTcgQyAyMy4xIDE3LjIxNyAyNC45IDE1LjcxNyAyNyAxNS43MTcgQyAyOC4xIDE1LjcxNyAyOC45IDE2LjExNyAyOS41IDE2LjcxNyBDIDMwIDE3LjQxNyAzMC4yIDE4LjMxNyAzMC4xIDE5LjMxNyBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwMzA4NyIgZD0iTSA1NS4xIDEyLjExNyBMIDUxLjQgMTIuMTE3IEMgNTEgMTIuMTE3IDUwLjcgMTIuMzE3IDUwLjUgMTIuNjE3IEwgNDUuMyAyMC4yMTcgTCA0My4xIDEyLjkxNyBDIDQzIDEyLjQxNyA0Mi41IDEyLjExNyA0Mi4xIDEyLjExNyBMIDM4LjQgMTIuMTE3IEMgMzggMTIuMTE3IDM3LjYgMTIuNTE3IDM3LjggMTMuMDE3IEwgNDEuOSAyNS4xMTcgTCAzOCAzMC41MTcgQyAzNy43IDMwLjkxNyAzOCAzMS41MTcgMzguNSAzMS41MTcgTCA0Mi4yIDMxLjUxNyBDIDQyLjYgMzEuNTE3IDQyLjkgMzEuMzE3IDQzLjEgMzEuMDE3IEwgNTUuNiAxMy4wMTcgQyA1NS45IDEyLjcxNyA1NS42IDEyLjExNyA1NS4xIDEyLjExNyBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA2Ny41IDQuOTE3IEwgNTkuNyA0LjkxNyBDIDU5LjIgNC45MTcgNTguNyA1LjMxNyA1OC42IDUuODE3IEwgNTUuNSAyNS43MTcgQyA1NS40IDI2LjExNyA1NS43IDI2LjQxNyA1Ni4xIDI2LjQxNyBMIDYwLjEgMjYuNDE3IEMgNjAuNSAyNi40MTcgNjAuOCAyNi4xMTcgNjAuOCAyNS44MTcgTCA2MS43IDIwLjExNyBDIDYxLjggMTkuNjE3IDYyLjIgMTkuMjE3IDYyLjggMTkuMjE3IEwgNjUuMyAxOS4yMTcgQyA3MC40IDE5LjIxNyA3My40IDE2LjcxNyA3NC4yIDExLjgxNyBDIDc0LjUgOS43MTcgNzQuMiA4LjAxNyA3My4yIDYuODE3IEMgNzIgNS42MTcgNzAuMSA0LjkxNyA2Ny41IDQuOTE3IFogTSA2OC40IDEyLjIxNyBDIDY4IDE1LjAxNyA2NS44IDE1LjAxNyA2My44IDE1LjAxNyBMIDYyLjYgMTUuMDE3IEwgNjMuNCA5LjgxNyBDIDYzLjQgOS41MTcgNjMuNyA5LjMxNyA2NCA5LjMxNyBMIDY0LjUgOS4zMTcgQyA2NS45IDkuMzE3IDY3LjIgOS4zMTcgNjcuOSAxMC4xMTcgQyA2OC40IDEwLjUxNyA2OC41IDExLjIxNyA2OC40IDEyLjIxNyBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA5MC43IDEyLjExNyBMIDg3IDEyLjExNyBDIDg2LjcgMTIuMTE3IDg2LjQgMTIuMzE3IDg2LjQgMTIuNjE3IEwgODYuMiAxMy42MTcgTCA4NS45IDEzLjIxNyBDIDg1LjEgMTIuMDE3IDgzLjMgMTEuNjE3IDgxLjUgMTEuNjE3IEMgNzcuNCAxMS42MTcgNzMuOSAxNC43MTcgNzMuMiAxOS4xMTcgQyA3Mi44IDIxLjMxNyA3My4zIDIzLjQxNyA3NC42IDI0LjgxNyBDIDc1LjcgMjYuMTE3IDc3LjQgMjYuNzE3IDc5LjMgMjYuNzE3IEMgODIuNiAyNi43MTcgODQuNSAyNC42MTcgODQuNSAyNC42MTcgTCA4NC4zIDI1LjYxNyBDIDg0LjIgMjYuMDE3IDg0LjUgMjYuNDE3IDg0LjkgMjYuNDE3IEwgODguMyAyNi40MTcgQyA4OC44IDI2LjQxNyA4OS4zIDI2LjAxNyA4OS40IDI1LjUxNyBMIDkxLjQgMTIuNzE3IEMgOTEuNCAxMi41MTcgOTEuMSAxMi4xMTcgOTAuNyAxMi4xMTcgWiBNIDg1LjUgMTkuMzE3IEMgODUuMSAyMS40MTcgODMuNSAyMi45MTcgODEuMyAyMi45MTcgQyA4MC4yIDIyLjkxNyA3OS40IDIyLjYxNyA3OC44IDIxLjkxNyBDIDc4LjIgMjEuMjE3IDc4IDIwLjMxNyA3OC4yIDE5LjMxNyBDIDc4LjUgMTcuMjE3IDgwLjMgMTUuNzE3IDgyLjQgMTUuNzE3IEMgODMuNSAxNS43MTcgODQuMyAxNi4xMTcgODQuOSAxNi43MTcgQyA4NS41IDE3LjQxNyA4NS43IDE4LjMxNyA4NS41IDE5LjMxNyBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA5NS4xIDUuNDE3IEwgOTEuOSAyNS43MTcgQyA5MS44IDI2LjExNyA5Mi4xIDI2LjQxNyA5Mi41IDI2LjQxNyBMIDk1LjcgMjYuNDE3IEMgOTYuMiAyNi40MTcgOTYuNyAyNi4wMTcgOTYuOCAyNS41MTcgTCAxMDAgNS42MTcgQyAxMDAuMSA1LjIxNyA5OS44IDQuOTE3IDk5LjQgNC45MTcgTCA5NS44IDQuOTE3IEMgOTUuNCA0LjkxNyA5NS4yIDUuMTE3IDk1LjEgNS40MTcgWiI+PC9wYXRoPjwvc3ZnPg",alt:"Donate with paypal","aria-label":"paypal"})," ","Donate"]}),Object(R.jsx)("p",{style:{marginTop:10,marginBottom:0,fontWeight:"bold"},children:"Crypto Wallet"}),Object(R.jsx)("img",{style:{width:100},src:C,alt:"crypto-wallet"})]}),Object(R.jsx)("h3",{style:{marginTop:15,marginBottom:0},children:"Share"}),Object(R.jsx)(Q.a,{url:ae.url,quote:ae.text,hashtag:ae.tags[0],className:"Demo__some-network__share-button",children:Object(R.jsx)(_.a,{size:48,round:!0})}),Object(R.jsx)(W.a,{url:ae.url,title:ae.title,className:"Demo__some-network__share-button",children:Object(R.jsx)(U.a,{size:48,round:!0})}),Object(R.jsx)(P.a,{url:ae.url,title:ae.text,separator:":: ",className:"Demo__some-network__share-button",children:Object(R.jsx)(G.a,{size:48,round:!0})}),Object(R.jsx)(Z.a,{url:ae.url,summary:ae.text,className:"Demo__some-network__share-button",children:Object(R.jsx)(H.a,{size:48,round:!0})}),Object(R.jsx)(F.a,{url:ae.url,title:ae.text,windowWidth:660,windowHeight:460,className:"Demo__some-network__share-button",children:Object(R.jsx)(V.a,{size:48,round:!0})}),Object(R.jsx)(J.a,{url:ae.url,title:ae.text,className:"Demo__some-network__share-button",children:Object(R.jsx)(X.a,{size:48,round:!0})}),Object(R.jsx)("div",{style:{marginTop:10}}),Object(R.jsxs)(q,{code:!0,children:["Build last updated at: ",ne]}),this.renderModal(),Object(R.jsx)("div",{children:Object(R.jsxs)("p",{children:[Object(R.jsx)("a",{href:"https://github.com/yashwanthm/cowin-vaccine-booking/issues",rel:"noreferrer",target:"_blank",children:"Report an issue"})," ",Object(R.jsx)("a",{href:"https://github.com/yashwanthm/cowin-vaccine-booking/",rel:"noreferrer",target:"_blank",children:"Git Repo is here"})]})})]})}}]),a}(n.a.Component),oe=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,434)).then((function(t){var a=t.getCLS,i=t.getFID,n=t.getFCP,c=t.getLCP,o=t.getTTFB;a(e),i(e),n(e),c(e),o(e)}))},se=a(165);se.a.initialize("G-GS2F4HCX5T"),se.a.pageview(window.location.pathname+window.location.search),o.a.render(Object(R.jsx)(n.a.StrictMode,{children:Object(R.jsx)(ce,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)})),oe()}},[[406,1,2]]]);
//# sourceMappingURL=main.96c3e642.chunk.js.map