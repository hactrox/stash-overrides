/*************************************

[rewrite_local]
^https?:\/\/(biz|wrapper)\.cyapi\.cn\/(.+\/(user.+|visitors|activity)|p\/v\d\/vip_info) url script-response-body https://raw.githubusercontent.com/hactrox/stash-overrides/main/colorfulpro.js
^http:\/\/adx\.sogaha\.cn\/sdk\/ad\/get url reject-200

[mitm]
hostname = *.cyapi.cn, adx.sogaha.cn

*************************************/


var respBody = JSON.parse($response.body);
const urls = ['/vip_info', '/activity', 'user'];

urls.forEach(url => {
  if ($request.url.includes(url)){
    switch(url) {
      case '/vip_info':
        respBody = {
          ...respBody, 
          vip: {
            "expires_time" : "4092599349",
            "is_auto_renewal" : true
          },
          svip: {
            "expires_time" : "4092599349",
            "is_auto_renewal" : true
          }
        }
        break;
      case '/activity':
        respBody.activities = [];
        break;
      case 'user':
        respBody.result = {
          ...respBody.result,
          ranking_above: 99,
          is_vip: true,
          vip_expired_at: 4092599349,
          svip_given: 9999,
          is_xy_vip: true,
          xy_svip_expire: 4092599349,
          wt: {
            ...respBody.result.wt,
            vip: {
              "auto_renewal_type" : "",
              "expired_at" : 0,
              "enabled" : true,
              "svip_apple_expired_at" : 4092599349,
              "is_auto_renewal" : true,
              "svip_expired_at" : 4092599349,
              "svip_auto_renewal_type" : ""
            },
            svip_given: 9999,
            ranking_above: 99,
          },
          is_phone_verified: true,
          phone_num: "18888888888",
          vip_take_effect: 1,
          is_primary: true,
          xy_vip_expire: 4092599349,
          svip_expired_at: 4092599349,
          svip_take_effect: 1,
          vip_type: "s",
          name: "hactrox",
          avatar: "https://avatars.githubusercontent.com/u/8434402?s=400&v=4",
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJ1c2VyX2lkIjoiNWY1YmZjNTdkMmM2ODkwMDE0ZTI2YmI4Iiwic3ZpcF9leHBpcmVkX2F0IjoxNzA1MzMxMTY2LjQxNjc3MSwidmlwX2V4cGlyZWRfYXQiOjB9.h_Cem89QarTXxVX9Z_Wt-Mak6ZHAjAJqgv3hEY6wpps"
        }
        break;
    }
  }
})

$done({ body: JSON.stringify(respBody)});
