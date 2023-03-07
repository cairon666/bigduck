---

excalidraw-plugin: parsed
tags: [excalidraw]

---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠==


# Text Elements
Backend ^oeOsBCvA

Frontend ^ArZt9nt0

UserService ^CjlTW2ZX

authService ^0uAeLl6L

1. Send first step ^WCG6edrV

emailService ^iC3H8mA4

3.send email_code to email ^TOdAD1Xg

id_auth
email_code ^49wJ703H

5. send second step ^nJlFvTLk

AuthGateway ^OgrToteC

2. generate email_code and id_auth
6. confirm email_code
10. get email ^8etmVx9a

7. check unique email
11. create user(with generate hast(pasword+salt) and id_user) ^PtX5FVXM

id_auth
password
first_name
second_name
gender?
day_of_birth?
 ^DrODTSe7

9. send third step ^l1tJirQ2

id_auth
email
is_confirm
email_code ^bc4NxzIE

redis ^zNYsLtzy

4. receive id_auth  ^a7WB9ngN

8. receive confirm ^40A2Dqbx

12. receive id_user ^IgwaQxsm

RegisterUser ^S1z4sXzI

postgres ^g85joKxY

email
password_hash
salt
first_name
second_name
 ^YQJ6D6kJ

QuizGateway ^6ZNraNTt

QuizService ^HgYc9LNi

QuestionService ^e3a4ncHE

id_user
quiz: {
    name
    description
    mode
    template_id
}
 ^DUYGV16L

1. send request ^MFuvk7Bu

email ^L3pz923t

id_auth ^ZuX7DVBU

id_quiz ^FOsc0v0T

. receive id_quiz ^ic53yxss

postgres ^U1A8AP34

id_user ^kPNfo7Dh

%%
# Drawing
```json
{
	"type": "excalidraw",
	"version": 2,
	"source": "https://github.com/zsviczian/obsidian-excalidraw-plugin/releases/tag/1.8.17",
	"elements": [
		{
			"type": "line",
			"version": 349,
			"versionNonce": 1342697751,
			"isDeleted": false,
			"id": "yhEGc0iHYeqSujAVF-ZKc",
			"fillStyle": "cross-hatch",
			"strokeWidth": 1,
			"strokeStyle": "dotted",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -298.7412173831922,
			"y": -455.24649664859777,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 39.93417267878658,
			"height": 2358.8784467792593,
			"seed": 117738903,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785535,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					39.93417267878658,
					2358.8784467792593
				]
			]
		},
		{
			"type": "text",
			"version": 147,
			"versionNonce": 159158233,
			"isDeleted": false,
			"id": "oeOsBCvA",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -267.7801983915346,
			"y": -455.5587677080717,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 218.93588256835938,
			"height": 66,
			"seed": 1581246265,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785535,
			"link": null,
			"locked": false,
			"fontSize": 55.213045340585936,
			"fontFamily": 1,
			"text": "Backend",
			"rawText": "Backend",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Backend"
		},
		{
			"type": "text",
			"version": 212,
			"versionNonce": 1178056247,
			"isDeleted": false,
			"id": "ArZt9nt0",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -531.6179357262179,
			"y": -452.71952232373815,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 216.27886962890625,
			"height": 61.199999999999996,
			"seed": 1206541881,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785535,
			"link": null,
			"locked": false,
			"fontSize": 51.835074790349076,
			"fontFamily": 1,
			"text": "Frontend",
			"rawText": "Frontend",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Frontend"
		},
		{
			"type": "rectangle",
			"version": 782,
			"versionNonce": 1522188247,
			"isDeleted": false,
			"id": "UGgoVdgWJBlKg6GAwiMop",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 2,
			"opacity": 100,
			"angle": 0,
			"x": 646.5297041198635,
			"y": -46.61731227559585,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 227,
			"height": 34,
			"seed": 98768951,
			"groupIds": [],
			"roundness": null,
			"boundElements": [
				{
					"type": "text",
					"id": "CjlTW2ZX"
				},
				{
					"id": "f71xr8so2ei3irLWp43nN",
					"type": "arrow"
				},
				{
					"id": "SObKGdbkWK9fXBdybdXNj",
					"type": "arrow"
				},
				{
					"id": "JUZ8I9bNxA2hgb6FHevCg",
					"type": "arrow"
				},
				{
					"id": "bCk-vhThlQCNIW3Wv9w7Q",
					"type": "arrow"
				}
			],
			"updated": 1677779026074,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 753,
			"versionNonce": 678549335,
			"isDeleted": false,
			"id": "CjlTW2ZX",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 2,
			"opacity": 100,
			"angle": 0,
			"x": 703.9297666808986,
			"y": -41.61731227559585,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 112.19987487792969,
			"height": 24,
			"seed": 262335161,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785535,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "UserService",
			"rawText": "UserService",
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "UGgoVdgWJBlKg6GAwiMop",
			"originalText": "UserService"
		},
		{
			"type": "rectangle",
			"version": 486,
			"versionNonce": 834350489,
			"isDeleted": false,
			"id": "dg-GVg7_43Zsblg2cgkpl",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 30.966506182087585,
			"y": -176.1445842074686,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 209,
			"height": 248,
			"seed": 1346489175,
			"groupIds": [],
			"roundness": null,
			"boundElements": [
				{
					"type": "text",
					"id": "0uAeLl6L"
				},
				{
					"id": "XAQ-vc7YMkft2MtFuZIWA",
					"type": "arrow"
				},
				{
					"id": "bCk-vhThlQCNIW3Wv9w7Q",
					"type": "arrow"
				},
				{
					"id": "JUZ8I9bNxA2hgb6FHevCg",
					"type": "arrow"
				},
				{
					"id": "hyMT3ejhpm8XmrdeSH1gP",
					"type": "arrow"
				},
				{
					"id": "QpLQ_Av0wM5zyxeU94ez0",
					"type": "arrow"
				},
				{
					"id": "NDx86kbLvhLE_mWpPd5xz",
					"type": "arrow"
				},
				{
					"id": "xa8fldczFUl067phkF5_h",
					"type": "arrow"
				},
				{
					"id": "DRzgx-FPoQQMiTLHQOUGA",
					"type": "arrow"
				},
				{
					"id": "BmEPdkJn2zFJuwO6vni_I",
					"type": "arrow"
				},
				{
					"id": "f71xr8so2ei3irLWp43nN",
					"type": "arrow"
				},
				{
					"id": "SObKGdbkWK9fXBdybdXNj",
					"type": "arrow"
				}
			],
			"updated": 1677778785535,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 413,
			"versionNonce": 1024119927,
			"isDeleted": false,
			"id": "0uAeLl6L",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 78.76657026900165,
			"y": -64.1445842074686,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 113.39987182617188,
			"height": 24,
			"seed": 1287892823,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785535,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "authService",
			"rawText": "authService",
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "dg-GVg7_43Zsblg2cgkpl",
			"originalText": "authService"
		},
		{
			"type": "text",
			"version": 898,
			"versionNonce": 219419257,
			"isDeleted": false,
			"id": "WCG6edrV",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 6.279193991794885,
			"x": -639.3074243979597,
			"y": -245.36162733096586,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 156.4986114501953,
			"height": 21.599999999999998,
			"seed": 426506073,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785535,
			"link": null,
			"locked": false,
			"fontSize": 18.159577486081105,
			"fontFamily": 1,
			"text": "1. Send first step",
			"rawText": "1. Send first step",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "1. Send first step"
		},
		{
			"type": "rectangle",
			"version": 392,
			"versionNonce": 1517971065,
			"isDeleted": false,
			"id": "k8KkkFKrD_cIYbFb08N4R",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 25.68184562139919,
			"y": 236.54714161623366,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 204,
			"height": 36,
			"seed": 1336848567,
			"groupIds": [],
			"roundness": null,
			"boundElements": [
				{
					"type": "text",
					"id": "iC3H8mA4"
				},
				{
					"id": "XAQ-vc7YMkft2MtFuZIWA",
					"type": "arrow"
				}
			],
			"updated": 1677781382857,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 334,
			"versionNonce": 1839208855,
			"isDeleted": false,
			"id": "iC3H8mA4",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 70.63191123419216,
			"y": 242.54714161623366,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 114.09986877441406,
			"height": 24,
			"seed": 1933312121,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677781382857,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "emailService",
			"rawText": "emailService",
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "k8KkkFKrD_cIYbFb08N4R",
			"originalText": "emailService"
		},
		{
			"type": "text",
			"version": 454,
			"versionNonce": 1458297913,
			"isDeleted": false,
			"id": "TOdAD1Xg",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 29.50288316133441,
			"y": 288.99669036322877,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 204.5128631591797,
			"height": 18,
			"seed": 657828505,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677781382857,
			"link": null,
			"locked": false,
			"fontSize": 15.324925715684302,
			"fontFamily": 1,
			"text": "3.send email_code to email",
			"rawText": "3.send email_code to email",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "3.send email_code to email"
		},
		{
			"type": "rectangle",
			"version": 559,
			"versionNonce": 1477085241,
			"isDeleted": false,
			"id": "TJfE2cI_zguKoy_h14HSj",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -836.3798182105043,
			"y": -132.1002750316056,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 124,
			"height": 64,
			"seed": 995373719,
			"groupIds": [],
			"roundness": null,
			"boundElements": [
				{
					"type": "text",
					"id": "49wJ703H"
				},
				{
					"id": "9aDvldSpaa2x35uz8FiFl",
					"type": "arrow"
				}
			],
			"updated": 1677778785535,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 532,
			"versionNonce": 1777071063,
			"isDeleted": false,
			"id": "49wJ703H",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -827.6497614478089,
			"y": -124.1002750316056,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 106.53988647460938,
			"height": 48,
			"seed": 1048053591,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785535,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "id_auth\nemail_code",
			"rawText": "id_auth\nemail_code",
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "TJfE2cI_zguKoy_h14HSj",
			"originalText": "id_auth\nemail_code"
		},
		{
			"type": "text",
			"version": 532,
			"versionNonce": 1910446361,
			"isDeleted": false,
			"id": "nJlFvTLk",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0.016202405383574536,
			"x": -640.3581296343892,
			"y": -133.08768792538015,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 172.33929443359375,
			"height": 20.4,
			"seed": 1081661015,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785535,
			"link": null,
			"locked": false,
			"fontSize": 17.499999999999993,
			"fontFamily": 1,
			"text": "5. send second step",
			"rawText": "5. send second step",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "5. send second step"
		},
		{
			"type": "arrow",
			"version": 1840,
			"versionNonce": 1913479415,
			"isDeleted": false,
			"id": "Oaqz-WPi_r7W-NnKnss6P",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -694.3055561681174,
			"y": -221.5673665059207,
			"strokeColor": "#862e9c",
			"backgroundColor": "transparent",
			"width": 302.3944471133525,
			"height": 6.270219866328375,
			"seed": 1853924695,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785535,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "0KPhP111hELNVn5hPqBMS",
				"focus": -0.11793035133869167,
				"gap": 13.405089966125786
			},
			"endBinding": {
				"elementId": "AXzF1o66vQenabebrLV47",
				"focus": 0.8875861680944146,
				"gap": 14.693701499303017
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					302.3944471133525,
					6.270219866328375
				]
			]
		},
		{
			"type": "arrow",
			"version": 2518,
			"versionNonce": 870879482,
			"isDeleted": false,
			"id": "QpLQ_Av0wM5zyxeU94ez0",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -181.96836777264838,
			"y": -150.69864711203826,
			"strokeColor": "#862e9c",
			"backgroundColor": "transparent",
			"width": 192.577834564937,
			"height": 4.481478235812574,
			"seed": 1591026455,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677969276318,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "AXzF1o66vQenabebrLV47",
				"gap": 17.22688757890967,
				"focus": -0.6791641195035784
			},
			"endBinding": {
				"elementId": "dg-GVg7_43Zsblg2cgkpl",
				"gap": 20.357039389798956,
				"focus": 0.7210766833847099
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					192.577834564937,
					4.481478235812574
				]
			]
		},
		{
			"type": "arrow",
			"version": 1320,
			"versionNonce": 1436438074,
			"isDeleted": false,
			"id": "XAQ-vc7YMkft2MtFuZIWA",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "dotted",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 127.05396096334479,
			"y": 82.60886622120384,
			"strokeColor": "#862e9c",
			"backgroundColor": "transparent",
			"width": 0.5739807274160995,
			"height": 140.70713689654784,
			"seed": 2086349815,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677969276320,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "dg-GVg7_43Zsblg2cgkpl",
				"gap": 10.753450428672382,
				"focus": 0.08534989947574993
			},
			"endBinding": {
				"elementId": "k8KkkFKrD_cIYbFb08N4R",
				"gap": 13.231138498481965,
				"focus": 0.0007200301426014795
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					0.5739807274160995,
					140.70713689654784
				]
			]
		},
		{
			"type": "arrow",
			"version": 2686,
			"versionNonce": 1767924154,
			"isDeleted": false,
			"id": "NDx86kbLvhLE_mWpPd5xz",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3.6202541868878484,
			"y": -126.77890302576554,
			"strokeColor": "#862e9c",
			"backgroundColor": "transparent",
			"width": 185.19781781150053,
			"height": 2.831716183496411,
			"seed": 235683609,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677969276318,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "dg-GVg7_43Zsblg2cgkpl",
				"gap": 27.346251995199736,
				"focus": 0.5781816528587534
			},
			"endBinding": {
				"elementId": "AXzF1o66vQenabebrLV47",
				"gap": 17.61769172694534,
				"focus": -0.6046970582421304
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					-185.19781781150053,
					-2.831716183496411
				]
			]
		},
		{
			"type": "arrow",
			"version": 2833,
			"versionNonce": 1308938039,
			"isDeleted": false,
			"id": "0RDHp18ephL7GLhvuRy85",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -398.1329714985512,
			"y": -155.99364505216704,
			"strokeColor": "#862e9c",
			"backgroundColor": "transparent",
			"width": 301.3826016049202,
			"height": 8.165939626315662,
			"seed": 1902549145,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785535,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "AXzF1o66vQenabebrLV47",
				"focus": 0.6777972018333495,
				"gap": 20.915563943089353
			},
			"endBinding": {
				"elementId": "YWvrQdStN6isuxFwL9D3i",
				"focus": 0.20286707119868733,
				"gap": 9.916539356640044
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					-301.3826016049202,
					-8.165939626315662
				]
			]
		},
		{
			"type": "arrow",
			"version": 2923,
			"versionNonce": 1609332474,
			"isDeleted": false,
			"id": "9aDvldSpaa2x35uz8FiFl",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -700.4884525489904,
			"y": -112.58573659982409,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 307.2710449935285,
			"height": 7.400927783032387,
			"seed": 1282328857,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677969276321,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "TJfE2cI_zguKoy_h14HSj",
				"gap": 11.891365661513873,
				"focus": -0.4259047230292025
			},
			"endBinding": {
				"elementId": "AXzF1o66vQenabebrLV47",
				"gap": 16,
				"focus": 0.5040759842483582
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					307.2710449935285,
					7.400927783032387
				]
			]
		},
		{
			"type": "arrow",
			"version": 2965,
			"versionNonce": 1228132439,
			"isDeleted": false,
			"id": "7jW47YQaMhp4icXJhTOnx",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -390.4219667201923,
			"y": -26.825753436728434,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 301.56445859157594,
			"height": 8.04454669029186,
			"seed": 1123790329,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785535,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "AXzF1o66vQenabebrLV47",
				"focus": 0.2318767136926307,
				"gap": 13.204559164730426
			},
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					-301.56445859157594,
					-8.04454669029186
				]
			]
		},
		{
			"type": "arrow",
			"version": 1865,
			"versionNonce": 1763711610,
			"isDeleted": false,
			"id": "xa8fldczFUl067phkF5_h",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -181.74906982542865,
			"y": -62.13271739254397,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 193.99709114955232,
			"height": 8.069130350832168,
			"seed": 673257591,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677969276318,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "AXzF1o66vQenabebrLV47",
				"gap": 17.446185526129398,
				"focus": -0.37705222702740177
			},
			"endBinding": {
				"elementId": "dg-GVg7_43Zsblg2cgkpl",
				"gap": 18.718484857963915,
				"focus": -0.024980459453234856
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					193.99709114955232,
					8.069130350832168
				]
			]
		},
		{
			"type": "arrow",
			"version": 1800,
			"versionNonce": 1911208762,
			"isDeleted": false,
			"id": "DRzgx-FPoQQMiTLHQOUGA",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 6.2662298401811825,
			"y": -37.97031267594499,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 198.1327008377056,
			"height": 4.089570215241679,
			"seed": 555139865,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677969276319,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "dg-GVg7_43Zsblg2cgkpl",
				"gap": 24.700276341906402,
				"focus": -0.09133439781783707
			},
			"endBinding": {
				"elementId": "AXzF1o66vQenabebrLV47",
				"gap": 7.328784354033587,
				"focus": -0.2593223483777347
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					-198.1327008377056,
					4.089570215241679
				]
			]
		},
		{
			"type": "rectangle",
			"version": 1006,
			"versionNonce": 1265584505,
			"isDeleted": false,
			"id": "AXzF1o66vQenabebrLV47",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -377.2174075554619,
			"y": -243.73221962195709,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 178.02215220390383,
			"height": 573.3031705433415,
			"seed": 82930423,
			"groupIds": [
				"ybakIfi0DqexNIm4vB-Dg"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "NDx86kbLvhLE_mWpPd5xz",
					"type": "arrow"
				},
				{
					"id": "BmEPdkJn2zFJuwO6vni_I",
					"type": "arrow"
				},
				{
					"id": "tN-3WL5u_WW19MAQgUJQW",
					"type": "arrow"
				},
				{
					"id": "tKGXkHnYbWSozkpO2Nx25",
					"type": "arrow"
				},
				{
					"id": "7jW47YQaMhp4icXJhTOnx",
					"type": "arrow"
				},
				{
					"id": "9aDvldSpaa2x35uz8FiFl",
					"type": "arrow"
				},
				{
					"id": "Oaqz-WPi_r7W-NnKnss6P",
					"type": "arrow"
				},
				{
					"id": "0RDHp18ephL7GLhvuRy85",
					"type": "arrow"
				},
				{
					"id": "hyMT3ejhpm8XmrdeSH1gP",
					"type": "arrow"
				},
				{
					"id": "QpLQ_Av0wM5zyxeU94ez0",
					"type": "arrow"
				},
				{
					"id": "DRzgx-FPoQQMiTLHQOUGA",
					"type": "arrow"
				},
				{
					"id": "xa8fldczFUl067phkF5_h",
					"type": "arrow"
				}
			],
			"updated": 1677778785535,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 372,
			"versionNonce": 1562306199,
			"isDeleted": false,
			"id": "OgrToteC",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -353.545707031542,
			"y": 19.130729228229484,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 131.91986083984375,
			"height": 24,
			"seed": 483784985,
			"groupIds": [
				"ybakIfi0DqexNIm4vB-Dg"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785535,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "AuthGateway",
			"rawText": "AuthGateway",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "AuthGateway"
		},
		{
			"type": "text",
			"version": 826,
			"versionNonce": 617704759,
			"isDeleted": false,
			"id": "8etmVx9a",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 37.514459428190264,
			"y": -371.2436379190471,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 273.49517822265625,
			"height": 54,
			"seed": 1222036791,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677781424524,
			"link": null,
			"locked": false,
			"fontSize": 15.048561071168317,
			"fontFamily": 1,
			"text": "2. generate email_code and id_auth\n6. confirm email_code\n10. get email",
			"rawText": "2. generate email_code and id_auth\n6. confirm email_code\n10. get email",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "2. generate email_code and id_auth\n6. confirm email_code\n10. get email"
		},
		{
			"type": "arrow",
			"version": 1086,
			"versionNonce": 44096186,
			"isDeleted": false,
			"id": "bCk-vhThlQCNIW3Wv9w7Q",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 253.6872995104485,
			"y": -85.21577840525887,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 359.0434571707541,
			"height": 37.69612538652177,
			"seed": 1571304057,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677969321451,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "dg-GVg7_43Zsblg2cgkpl",
				"focus": -0.3369840728086791,
				"gap": 13.720793328360912
			},
			"endBinding": {
				"elementId": "a66msiXGgdvc6gjDMEBnX",
				"focus": -1.2031287495382013,
				"gap": 29.974155917495068
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					359.0434571707541,
					37.69612538652177
				]
			]
		},
		{
			"type": "arrow",
			"version": 1219,
			"versionNonce": 1390716794,
			"isDeleted": false,
			"id": "JUZ8I9bNxA2hgb6FHevCg",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 628.6392816435247,
			"y": -40.24054772332261,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 368.9187956659656,
			"height": 25.289519088959935,
			"seed": 865392473,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677969276317,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "a66msiXGgdvc6gjDMEBnX",
				"gap": 30.34379581612447,
				"focus": -1.2582413980658356
			},
			"endBinding": {
				"elementId": "dg-GVg7_43Zsblg2cgkpl",
				"gap": 19.75397979547148,
				"focus": -0.16699109405151916
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					-368.9187956659656,
					-25.289519088959935
				]
			]
		},
		{
			"type": "text",
			"version": 733,
			"versionNonce": 292121815,
			"isDeleted": false,
			"id": "PtX5FVXM",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 648.7468364504249,
			"y": -332.3858757228933,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 620.559326171875,
			"height": 48,
			"seed": 1126761753,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785535,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "7. check unique email\n11. create user(with generate hast(pasword+salt) and id_user)",
			"rawText": "7. check unique email\n11. create user(with generate hast(pasword+salt) and id_user)",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "7. check unique email\n11. create user(with generate hast(pasword+salt) and id_user)"
		},
		{
			"type": "arrow",
			"version": 3031,
			"versionNonce": 634499097,
			"isDeleted": false,
			"id": "tKGXkHnYbWSozkpO2Nx25",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -701.5456382538272,
			"y": 138.4152193123175,
			"strokeColor": "#1864ab",
			"backgroundColor": "transparent",
			"width": 293.69052138766796,
			"height": 6.476767848385975,
			"seed": 1154495769,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785535,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "re696VYtgkYmG-mnjWSdW",
				"focus": 0.7103646588490999,
				"gap": 12.791525217630522
			},
			"endBinding": {
				"elementId": "AXzF1o66vQenabebrLV47",
				"focus": -0.362460037582835,
				"gap": 30.637709310697346
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					293.69052138766796,
					6.476767848385975
				]
			]
		},
		{
			"type": "arrow",
			"version": 2391,
			"versionNonce": 494123511,
			"isDeleted": false,
			"id": "tN-3WL5u_WW19MAQgUJQW",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -403.53689600674,
			"y": 210.48274563848867,
			"strokeColor": "#1864ab",
			"backgroundColor": "transparent",
			"width": 302.56831147253763,
			"height": 2.0172362025197685,
			"seed": 495156375,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785535,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "AXzF1o66vQenabebrLV47",
				"focus": -0.5860233552282309,
				"gap": 26.31948845127812
			},
			"endBinding": {
				"elementId": "F664JVlWP4HbUhwXKx--y",
				"focus": 0.26428869591002213,
				"gap": 11.342639411675407
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					-302.56831147253763,
					-2.0172362025197685
				]
			]
		},
		{
			"type": "text",
			"version": 504,
			"versionNonce": 1882604793,
			"isDeleted": false,
			"id": "l1tJirQ2",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 6.279414194456716,
			"x": -647.1088427341214,
			"y": 111.7865992329098,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 178.67979431152344,
			"height": 24,
			"seed": 66665177,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785535,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "9. send third step",
			"rawText": "9. send third step",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "9. send third step"
		},
		{
			"type": "arrow",
			"version": 2781,
			"versionNonce": 764782650,
			"isDeleted": false,
			"id": "hyMT3ejhpm8XmrdeSH1gP",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -174.74627042781665,
			"y": 38.99274025697386,
			"strokeColor": "#1864ab",
			"backgroundColor": "transparent",
			"width": 194.4160359975051,
			"height": 3.682245854822213,
			"seed": 1388366775,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677969276318,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "AXzF1o66vQenabebrLV47",
				"gap": 24.448984923741392,
				"focus": -0.021071013710247402
			},
			"endBinding": {
				"elementId": "dg-GVg7_43Zsblg2cgkpl",
				"gap": 11.296740612399105,
				"focus": -0.7700694924139961
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					194.4160359975051,
					3.682245854822213
				]
			]
		},
		{
			"type": "arrow",
			"version": 2829,
			"versionNonce": 1914913786,
			"isDeleted": false,
			"id": "BmEPdkJn2zFJuwO6vni_I",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 9.663436081869094,
			"y": 55.6167767567687,
			"strokeColor": "#1864ab",
			"backgroundColor": "transparent",
			"width": 187.32318296964218,
			"height": 2.050757963935766,
			"seed": 861596215,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677969276319,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "dg-GVg7_43Zsblg2cgkpl",
				"gap": 21.303070100218463,
				"focus": -0.8721040162357581
			},
			"endBinding": {
				"elementId": "AXzF1o66vQenabebrLV47",
				"gap": 21.535508463784964,
				"focus": 0.03280795417267658
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					-187.32318296964218,
					-2.050757963935766
				]
			]
		},
		{
			"type": "arrow",
			"version": 1421,
			"versionNonce": 332182714,
			"isDeleted": false,
			"id": "f71xr8so2ei3irLWp43nN",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 253.91522413080554,
			"y": 34.7321864474723,
			"strokeColor": "#1864ab",
			"backgroundColor": "transparent",
			"width": 378.66576204034004,
			"height": 63.40092208361688,
			"seed": 667578775,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677969276319,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "dg-GVg7_43Zsblg2cgkpl",
				"gap": 13.948717948717956,
				"focus": 0.754144090532597
			},
			"endBinding": {
				"elementId": "UGgoVdgWJBlKg6GAwiMop",
				"gap": 13.9487179487179,
				"focus": 0.5663456341862249
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					378.66576204034004,
					-63.40092208361688
				]
			]
		},
		{
			"type": "arrow",
			"version": 1435,
			"versionNonce": 1217006970,
			"isDeleted": false,
			"id": "SObKGdbkWK9fXBdybdXNj",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 632.5809861711455,
			"y": -21.00052015216393,
			"strokeColor": "#1864ab",
			"backgroundColor": "transparent",
			"width": 379.368178453778,
			"height": 73.93871000682061,
			"seed": 1650646583,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677969276320,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "UGgoVdgWJBlKg6GAwiMop",
				"gap": 13.948717948718013,
				"focus": 0.41468442649289966
			},
			"endBinding": {
				"elementId": "dg-GVg7_43Zsblg2cgkpl",
				"gap": 13.246301535279883,
				"focus": 0.8868472303923619
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					-379.368178453778,
					73.93871000682061
				]
			]
		},
		{
			"type": "rectangle",
			"version": 661,
			"versionNonce": 2108475735,
			"isDeleted": false,
			"id": "oDO1ZChxqhCtBrYow0BJl",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 34.404697742625615,
			"y": -307.0397093682403,
			"strokeColor": "#1864ab",
			"backgroundColor": "transparent",
			"width": 201.07119570333415,
			"height": 122.58845080413556,
			"seed": 597040697,
			"groupIds": [
				"s35G_QnHdUZT5OOZ4cVIL"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "SObKGdbkWK9fXBdybdXNj",
					"type": "arrow"
				}
			],
			"updated": 1677778785535,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 178,
			"versionNonce": 392190873,
			"isDeleted": false,
			"id": "bc4NxzIE",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 86.41390863734682,
			"y": -272.7451220260001,
			"strokeColor": "#1864ab",
			"backgroundColor": "transparent",
			"width": 85.232177734375,
			"height": 76.8,
			"seed": 196936825,
			"groupIds": [
				"s35G_QnHdUZT5OOZ4cVIL"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785535,
			"link": null,
			"locked": false,
			"fontSize": 16,
			"fontFamily": 1,
			"text": "id_auth\nemail\nis_confirm\nemail_code",
			"rawText": "id_auth\nemail\nis_confirm\nemail_code",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "id_auth\nemail\nis_confirm\nemail_code"
		},
		{
			"type": "text",
			"version": 104,
			"versionNonce": 1377273463,
			"isDeleted": false,
			"id": "zNYsLtzy",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 108.17854206153521,
			"y": -301.0429655900991,
			"strokeColor": "#1864ab",
			"backgroundColor": "transparent",
			"width": 46.159942626953125,
			"height": 24,
			"seed": 886787447,
			"groupIds": [
				"s35G_QnHdUZT5OOZ4cVIL"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785535,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "redis",
			"rawText": "redis",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "redis"
		},
		{
			"type": "text",
			"version": 448,
			"versionNonce": 568557689,
			"isDeleted": false,
			"id": "a7WB9ngN",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0.0004300495865505738,
			"x": -642.8201761803989,
			"y": -188.63400007354284,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 167.1417694091797,
			"height": 20.4,
			"seed": 663200503,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785535,
			"link": null,
			"locked": false,
			"fontSize": 17.358479398537693,
			"fontFamily": 1,
			"text": "4. receive id_auth ",
			"rawText": "4. receive id_auth ",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "4. receive id_auth "
		},
		{
			"type": "text",
			"version": 537,
			"versionNonce": 7184279,
			"isDeleted": false,
			"id": "DrODTSe7",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -847.5675994401165,
			"y": 21.68325877968931,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 125.98490905761719,
			"height": 142.79999999999998,
			"seed": 2051998201,
			"groupIds": [
				"k55mU73V2xHLaN0A-c5x8"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785535,
			"link": null,
			"locked": false,
			"fontSize": 17.81129656801561,
			"fontFamily": 1,
			"text": "id_auth\npassword\nfirst_name\nsecond_name\ngender?\nday_of_birth?\n",
			"rawText": "id_auth\npassword\nfirst_name\nsecond_name\ngender?\nday_of_birth?\n",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "id_auth\npassword\nfirst_name\nsecond_name\ngender?\nday_of_birth?\n"
		},
		{
			"type": "rectangle",
			"version": 509,
			"versionNonce": 1047464281,
			"isDeleted": false,
			"id": "re696VYtgkYmG-mnjWSdW",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -852.9325992568082,
			"y": 13.531767982686858,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 138.59543578535056,
			"height": 142.67953693616755,
			"seed": 528915321,
			"groupIds": [
				"k55mU73V2xHLaN0A-c5x8"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "tKGXkHnYbWSozkpO2Nx25",
					"type": "arrow"
				}
			],
			"updated": 1677778785535,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 158,
			"versionNonce": 1793299639,
			"isDeleted": false,
			"id": "T-pzgy32PY-86wDsZ1NPx",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 79.19232298431933,
			"y": -273.7092256638176,
			"strokeColor": "#1864ab",
			"backgroundColor": "transparent",
			"width": 114.8467584983357,
			"height": 79.4762916405556,
			"seed": 1489417495,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785536,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 272,
			"versionNonce": 1448506937,
			"isDeleted": false,
			"id": "40A2Dqbx",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0.037139358443531556,
			"x": -640.6872833440494,
			"y": -66.34627272781651,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 172.89981079101562,
			"height": 24,
			"seed": 79819033,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785536,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "8. receive confirm",
			"rawText": "8. receive confirm",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "8. receive confirm"
		},
		{
			"type": "text",
			"version": 254,
			"versionNonce": 1296783575,
			"isDeleted": false,
			"id": "IgwaQxsm",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -640.9930189001432,
			"y": 184.3591481035146,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 185.47979736328125,
			"height": 24,
			"seed": 1517847063,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677781422092,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "12. receive id_user",
			"rawText": "12. receive id_user",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "12. receive id_user"
		},
		{
			"type": "line",
			"version": 293,
			"versionNonce": 1551714073,
			"isDeleted": false,
			"id": "vfQfPeHtEErfyrHC6ex6m",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1226.0820061982533,
			"y": 391.8497415253419,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2041.7580484657312,
			"height": 4.464485528715159,
			"seed": 955431417,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785536,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					2041.7580484657312,
					4.464485528715159
				]
			]
		},
		{
			"type": "text",
			"version": 625,
			"versionNonce": 1443634617,
			"isDeleted": false,
			"id": "S1z4sXzI",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1092.9650693409935,
			"y": -345.0066055802509,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 248.99461364746094,
			"height": 46.8,
			"seed": 1759782263,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677784020110,
			"link": null,
			"locked": false,
			"fontSize": 39.757587263516996,
			"fontFamily": 1,
			"text": "RegisterUser",
			"rawText": "RegisterUser",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "RegisterUser"
		},
		{
			"type": "rectangle",
			"version": 520,
			"versionNonce": 524071449,
			"isDeleted": false,
			"id": "a66msiXGgdvc6gjDMEBnX",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 642.7049125986977,
			"y": -267.1274212932178,
			"strokeColor": "#1864ab",
			"backgroundColor": "transparent",
			"width": 229,
			"height": 200,
			"seed": 1995429113,
			"groupIds": [
				"6G2Y5CkPSNpqIrKnHaowQ"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "bCk-vhThlQCNIW3Wv9w7Q",
					"type": "arrow"
				},
				{
					"id": "JUZ8I9bNxA2hgb6FHevCg",
					"type": "arrow"
				}
			],
			"updated": 1677781878141,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 220,
			"versionNonce": 1043826231,
			"isDeleted": false,
			"id": "g85joKxY",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 715.2431379743149,
			"y": -244.06023029850053,
			"strokeColor": "#1864ab",
			"backgroundColor": "transparent",
			"width": 66.81614685058594,
			"height": 19.2,
			"seed": 754921527,
			"groupIds": [
				"idAU77FOVVv5lVcoZauip",
				"6G2Y5CkPSNpqIrKnHaowQ"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1677781878142,
			"link": null,
			"locked": false,
			"fontSize": 16,
			"fontFamily": 1,
			"text": "postgres",
			"rawText": "postgres",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "postgres"
		},
		{
			"type": "rectangle",
			"version": 352,
			"versionNonce": 127163577,
			"isDeleted": false,
			"id": "7k0cT5yB5Yy7BLQh1WKo2",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 687.0664500474865,
			"y": -192.53619837184584,
			"strokeColor": "#1864ab",
			"backgroundColor": "transparent",
			"width": 147.62415814136995,
			"height": 108.51273390613657,
			"seed": 2132863737,
			"groupIds": [
				"hvEbkhVngAjMFJ2CCg0Um",
				"idAU77FOVVv5lVcoZauip",
				"6G2Y5CkPSNpqIrKnHaowQ"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1677781878142,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 301,
			"versionNonce": 804759383,
			"isDeleted": false,
			"id": "YQJ6D6kJ",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 702.9530265582051,
			"y": -192.23694263085764,
			"strokeColor": "#1864ab",
			"backgroundColor": "transparent",
			"width": 110.78265380859375,
			"height": 100.80000000000001,
			"seed": 1986193239,
			"groupIds": [
				"hvEbkhVngAjMFJ2CCg0Um",
				"idAU77FOVVv5lVcoZauip",
				"6G2Y5CkPSNpqIrKnHaowQ"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1677781878142,
			"link": null,
			"locked": false,
			"fontSize": 14.921136972523113,
			"fontFamily": 1,
			"text": "email\npassword_hash\nsalt\nfirst_name\nsecond_name\n",
			"rawText": "email\npassword_hash\nsalt\nfirst_name\nsecond_name\n",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "email\npassword_hash\nsalt\nfirst_name\nsecond_name\n"
		},
		{
			"type": "rectangle",
			"version": 479,
			"versionNonce": 918622649,
			"isDeleted": false,
			"id": "j820Qnp5f1XaOX-DOqrLb",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -388.1096770227067,
			"y": 427.50273479331804,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 191.0399739283239,
			"height": 222.91351191052425,
			"seed": 42975353,
			"groupIds": [
				"Z9jDkmYtFlJSSvKMhwJri"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "yWEmZifcFulDNP6OthHEr",
					"type": "arrow"
				},
				{
					"id": "yIm6UYkF7lVMzbZ8Rfzgd",
					"type": "arrow"
				},
				{
					"id": "rNtU39KpazWdmE5b4rrpi",
					"type": "arrow"
				}
			],
			"updated": 1677778785536,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 421,
			"versionNonce": 1591525975,
			"isDeleted": false,
			"id": "6ZNraNTt",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -374.21062244938526,
			"y": 546.5222753107327,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 154.94044494628906,
			"height": 28.799999999999997,
			"seed": 1198536377,
			"groupIds": [
				"Z9jDkmYtFlJSSvKMhwJri"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785536,
			"link": null,
			"locked": false,
			"fontSize": 24.311611084599935,
			"fontFamily": 1,
			"text": "QuizGateway",
			"rawText": "QuizGateway",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "QuizGateway"
		},
		{
			"type": "line",
			"version": 717,
			"versionNonce": 539118745,
			"isDeleted": false,
			"id": "PYPIT6IeCxwT6hn2RrHYU",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -1145.945615148194,
			"y": 1195.7591060036114,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 2041.7580484657312,
			"height": 4.464485528715159,
			"seed": 1911542713,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677779044079,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					2041.7580484657312,
					4.464485528715159
				]
			]
		},
		{
			"type": "rectangle",
			"version": 1631,
			"versionNonce": 457697465,
			"isDeleted": false,
			"id": "SCoD48gGzla69SCZAfqFg",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 2,
			"opacity": 100,
			"angle": 0,
			"x": -20.36951287468105,
			"y": 514.8772591459403,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 227,
			"height": 34,
			"seed": 91599479,
			"groupIds": [],
			"roundness": null,
			"boundElements": [
				{
					"id": "f71xr8so2ei3irLWp43nN",
					"type": "arrow"
				},
				{
					"id": "SObKGdbkWK9fXBdybdXNj",
					"type": "arrow"
				},
				{
					"id": "JUZ8I9bNxA2hgb6FHevCg",
					"type": "arrow"
				},
				{
					"id": "bCk-vhThlQCNIW3Wv9w7Q",
					"type": "arrow"
				},
				{
					"type": "text",
					"id": "HgYc9LNi"
				},
				{
					"id": "rNtU39KpazWdmE5b4rrpi",
					"type": "arrow"
				}
			],
			"updated": 1677778914127,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1591,
			"versionNonce": 202562391,
			"isDeleted": false,
			"id": "HgYc9LNi",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 2,
			"opacity": 100,
			"angle": 0,
			"x": 38.730546634596294,
			"y": 519.8772591459403,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 108.79988098144531,
			"height": 24,
			"seed": 2077103225,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778914128,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "QuizService",
			"rawText": "QuizService",
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "SCoD48gGzla69SCZAfqFg",
			"originalText": "QuizService"
		},
		{
			"type": "rectangle",
			"version": 1407,
			"versionNonce": 158698969,
			"isDeleted": false,
			"id": "iXX-iF-dXNjRXxTIFSGd1",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 2,
			"opacity": 100,
			"angle": 0,
			"x": -17.46731221334096,
			"y": 569.1277278369453,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 222,
			"height": 34,
			"seed": 1579445847,
			"groupIds": [],
			"roundness": null,
			"boundElements": [
				{
					"id": "f71xr8so2ei3irLWp43nN",
					"type": "arrow"
				},
				{
					"id": "SObKGdbkWK9fXBdybdXNj",
					"type": "arrow"
				},
				{
					"id": "JUZ8I9bNxA2hgb6FHevCg",
					"type": "arrow"
				},
				{
					"id": "bCk-vhThlQCNIW3Wv9w7Q",
					"type": "arrow"
				},
				{
					"type": "text",
					"id": "e3a4ncHE"
				}
			],
			"updated": 1677779034045,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1384,
			"versionNonce": 483760183,
			"isDeleted": false,
			"id": "e3a4ncHE",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 2,
			"opacity": 100,
			"angle": 0,
			"x": 18.092769268592633,
			"y": 574.1277278369453,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 150.8798370361328,
			"height": 24,
			"seed": 1466009241,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677779034046,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "QuestionService",
			"rawText": "QuestionService",
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "iXX-iF-dXNjRXxTIFSGd1",
			"originalText": "QuestionService"
		},
		{
			"type": "rectangle",
			"version": 459,
			"versionNonce": 2047434455,
			"isDeleted": false,
			"id": "npeCzD__aoGS4Ngl8qM6D",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -870.5640192423115,
			"y": 412.6527521850578,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 150.34827587437613,
			"height": 161.88040016352215,
			"seed": 986745721,
			"groupIds": [
				"F7MGsoAvVu8FhgbDGoTlJ"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "yWEmZifcFulDNP6OthHEr",
					"type": "arrow"
				}
			],
			"updated": 1677778785536,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 488,
			"versionNonce": 216129049,
			"isDeleted": false,
			"id": "DUYGV16L",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -859.644870715122,
			"y": 426.0917042185215,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 126.30427551269531,
			"height": 153.6,
			"seed": 1046291097,
			"groupIds": [
				"F7MGsoAvVu8FhgbDGoTlJ"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "yWEmZifcFulDNP6OthHEr",
					"type": "arrow"
				}
			],
			"updated": 1677778785536,
			"link": null,
			"locked": false,
			"fontSize": 16,
			"fontFamily": 1,
			"text": "id_user\nquiz: {\n    name\n    description\n    mode\n    template_id\n}\n",
			"rawText": "id_user\nquiz: {\n    name\n    description\n    mode\n    template_id\n}\n",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "id_user\nquiz: {\n    name\n    description\n    mode\n    template_id\n}\n"
		},
		{
			"type": "arrow",
			"version": 1506,
			"versionNonce": 289762295,
			"isDeleted": false,
			"id": "yWEmZifcFulDNP6OthHEr",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -702.9719230023775,
			"y": 457.1824727639488,
			"strokeColor": "#862e9c",
			"backgroundColor": "transparent",
			"width": 284.06262048054646,
			"height": 2.6476250243403,
			"seed": 998853847,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785536,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "DUYGV16L",
				"focus": -0.6019089404744777,
				"gap": 30.368672200049218
			},
			"endBinding": {
				"elementId": "j820Qnp5f1XaOX-DOqrLb",
				"focus": 0.6938501534626503,
				"gap": 30.799625499124318
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					284.06262048054646,
					2.6476250243403
				]
			]
		},
		{
			"type": "arrow",
			"version": 1662,
			"versionNonce": 554742521,
			"isDeleted": false,
			"id": "yIm6UYkF7lVMzbZ8Rfzgd",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -415.58288356911993,
			"y": 597.2481235091919,
			"strokeColor": "#862e9c",
			"backgroundColor": "transparent",
			"width": 288.9581588826581,
			"height": 0.09662097748616816,
			"seed": 105975417,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785536,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "j820Qnp5f1XaOX-DOqrLb",
				"focus": -0.5224521313221012,
				"gap": 27.473206546413223
			},
			"endBinding": {
				"elementId": "tGmSFxOgLWmQtdbId3dYX",
				"focus": -0.3863968626151317,
				"gap": 10.514721380372805
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					-288.9581588826581,
					0.09662097748616816
				]
			]
		},
		{
			"type": "text",
			"version": 520,
			"versionNonce": 1002624279,
			"isDeleted": false,
			"id": "MFuvk7Bu",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -637.244701336666,
			"y": 429.448109837136,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 118.6722412109375,
			"height": 19.2,
			"seed": 680138327,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785536,
			"link": null,
			"locked": false,
			"fontSize": 16,
			"fontFamily": 1,
			"text": "1. send request",
			"rawText": "1. send request",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "1. send request"
		},
		{
			"type": "rectangle",
			"version": 398,
			"versionNonce": 1985080281,
			"isDeleted": false,
			"id": "0KPhP111hELNVn5hPqBMS",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -837.8206470755927,
			"y": -236.12087420380044,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 130.11000094134957,
			"height": 29.69902195400371,
			"seed": 772457753,
			"groupIds": [
				"ny4NR9017c9T7cfVVq0f9"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "Oaqz-WPi_r7W-NnKnss6P",
					"type": "arrow"
				}
			],
			"updated": 1677778785536,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 639,
			"versionNonce": 1089870391,
			"isDeleted": false,
			"id": "L3pz923t",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -796.5660898761759,
			"y": -234.2215644904174,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 46.57994079589844,
			"height": 24,
			"seed": 142196215,
			"groupIds": [
				"4f5rFq_2uU5sCuGovlsSs",
				"ny4NR9017c9T7cfVVq0f9"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785536,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "email",
			"rawText": "email",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "email"
		},
		{
			"type": "rectangle",
			"version": 359,
			"versionNonce": 79235257,
			"isDeleted": false,
			"id": "YWvrQdStN6isuxFwL9D3i",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -839.5421134014609,
			"y": -184.41050663644245,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 130.11000094134957,
			"height": 29.69902195400371,
			"seed": 1679989559,
			"groupIds": [
				"3tnERoBg9MUJC1xvmOcXt"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "0RDHp18ephL7GLhvuRy85",
					"type": "arrow"
				},
				{
					"id": "9aDvldSpaa2x35uz8FiFl",
					"type": "arrow"
				}
			],
			"updated": 1677778785536,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 628,
			"versionNonce": 96713559,
			"isDeleted": false,
			"id": "ZuX7DVBU",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -815.3221635288505,
			"y": -179.2665098131916,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 78.159912109375,
			"height": 24,
			"seed": 1498486713,
			"groupIds": [
				"h0Lwy9mkeTphAlQ5fMhh8",
				"3tnERoBg9MUJC1xvmOcXt"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785536,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "id_auth",
			"rawText": "id_auth",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "id_auth"
		},
		{
			"type": "rectangle",
			"version": 385,
			"versionNonce": 1978239385,
			"isDeleted": false,
			"id": "F664JVlWP4HbUhwXKx--y",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -847.5578478323026,
			"y": 189.0674656588343,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 130.11000094134957,
			"height": 29.69902195400371,
			"seed": 2131499063,
			"groupIds": [
				"ygAQMWVJX2H6wmzA74SMO"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "tN-3WL5u_WW19MAQgUJQW",
					"type": "arrow"
				}
			],
			"updated": 1677778785536,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 659,
			"versionNonce": 1585461367,
			"isDeleted": false,
			"id": "kPNfo7Dh",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -822.7654396649317,
			"y": 193.63900418732464,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 74.0399169921875,
			"height": 24,
			"seed": 1502210745,
			"groupIds": [
				"oqR9pklQZHSJAXcKXRnDU",
				"ygAQMWVJX2H6wmzA74SMO"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785536,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "id_user",
			"rawText": "id_user",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "id_user"
		},
		{
			"type": "rectangle",
			"version": 655,
			"versionNonce": 1930882681,
			"isDeleted": false,
			"id": "tGmSFxOgLWmQtdbId3dYX",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -868.4734967656652,
			"y": 588.2721144864644,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 153.41773293351446,
			"height": 29.69902195400371,
			"seed": 1056455447,
			"groupIds": [
				"yb311pPZxflKDGMUxCiAN"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "yIm6UYkF7lVMzbZ8Rfzgd",
					"type": "arrow"
				}
			],
			"updated": 1677778785536,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 856,
			"versionNonce": 552604055,
			"isDeleted": false,
			"id": "FOsc0v0T",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -829.0796300247035,
			"y": 591.9504501223773,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 70.37991333007812,
			"height": 24,
			"seed": 2014176729,
			"groupIds": [
				"C07jG6axFA5gYpaDlmdvf",
				"yb311pPZxflKDGMUxCiAN"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785536,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "id_quiz",
			"rawText": "id_quiz",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "id_quiz"
		},
		{
			"type": "text",
			"version": 420,
			"versionNonce": 855947097,
			"isDeleted": false,
			"id": "ic53yxss",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -646.1978489645545,
			"y": 569.6192536428831,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 162.15980529785156,
			"height": 24,
			"seed": 1392087831,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677778785536,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": ". receive id_quiz",
			"rawText": ". receive id_quiz",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": ". receive id_quiz"
		},
		{
			"type": "arrow",
			"version": 1546,
			"versionNonce": 2012710842,
			"isDeleted": false,
			"id": "rNtU39KpazWdmE5b4rrpi",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -181.6368210781995,
			"y": 532.8843408926718,
			"strokeColor": "#862e9c",
			"backgroundColor": "transparent",
			"width": 148.76789939884634,
			"height": 1.096426482671859,
			"seed": 849776183,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1677969276322,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "j820Qnp5f1XaOX-DOqrLb",
				"gap": 15.432882016183328,
				"focus": -0.06145535057120419
			},
			"endBinding": {
				"elementId": "SCoD48gGzla69SCZAfqFg",
				"gap": 12.4994088046721,
				"focus": -0.16999578331247214
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					148.76789939884634,
					1.096426482671859
				]
			]
		},
		{
			"type": "rectangle",
			"version": 1706,
			"versionNonce": 1937536695,
			"isDeleted": false,
			"id": "D3NNRmn4uhITXHiLhQoww",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 221.21854758617604,
			"y": 515.9516365575516,
			"strokeColor": "#1864ab",
			"backgroundColor": "transparent",
			"width": 200.00115373448142,
			"height": 88.26986107805014,
			"seed": 1980872089,
			"groupIds": [
				"KVPDgRU8nXryIKu23eF7e"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1677779037780,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1366,
			"versionNonce": 660127961,
			"isDeleted": false,
			"id": "U1A8AP34",
			"fillStyle": "cross-hatch",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 284.2360823080599,
			"y": 548.2494914794706,
			"strokeColor": "#1864ab",
			"backgroundColor": "transparent",
			"width": 65.38040161132812,
			"height": 18,
			"seed": 1967180919,
			"groupIds": [
				"nRg0xmhBIhVlhE6suoWyJ",
				"KVPDgRU8nXryIKu23eF7e"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1677779041328,
			"link": null,
			"locked": false,
			"fontSize": 15.665892778746434,
			"fontFamily": 1,
			"text": "postgres",
			"rawText": "postgres",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "postgres"
		}
	],
	"appState": {
		"theme": "dark",
		"viewBackgroundColor": "#f8f9fa",
		"currentItemStrokeColor": "#1864ab",
		"currentItemBackgroundColor": "transparent",
		"currentItemFillStyle": "cross-hatch",
		"currentItemStrokeWidth": 0.5,
		"currentItemStrokeStyle": "dotted",
		"currentItemRoughness": 1,
		"currentItemOpacity": 100,
		"currentItemFontFamily": 1,
		"currentItemFontSize": 16,
		"currentItemTextAlign": "left",
		"currentItemStartArrowhead": null,
		"currentItemEndArrowhead": "arrow",
		"scrollX": 593.475797986177,
		"scrollY": 510.0590455640263,
		"zoom": {
			"value": 1.121189299069939
		},
		"currentItemRoundness": "sharp",
		"gridSize": null,
		"colorPalette": {},
		"currentStrokeOptions": null,
		"previousGridSize": null
	},
	"files": {}
}
```
%%