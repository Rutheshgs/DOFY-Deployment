Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_lessthan30days.png' where Identifier = 73;
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_lessthan31-90days.png' where Identifier = 74;
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_lessthan91-180days.png' where Identifier = 75;
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_lessthan180-270days.png' where Identifier = 76;
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_lessthan271-330days.png' where Identifier = 77;
GO

Alter Table Status
Add ColorCode varchar(15);
GO

Update Status set ColorCode = '#89CFF0' Where EnumName = 'Pending';
Update Status set ColorCode = '#0000FF' Where EnumName = 'Scheduled';
Update Status set ColorCode = '#FAFA33' Where EnumName in ('InProgress', 'Assigned', 'ReScheduled', 'ReQuote', 'Delayed');
Update Status set ColorCode = '#00FF00' Where EnumName = 'Completed';
Update Status set ColorCode = '#FFBF00' Where EnumName = 'Failed';
Update Status set ColorCode = '#FF3131' Where EnumName in ('Cancelled', 'Cancel_Request');
GO

INSERT INTO [dbo].[Status]
           ([EntityType]
           ,[Name]
           ,[Description]
           ,[DisplayName]
           ,[EnumName]
           ,[TemplateText]
           ,[DisplayInList]
           ,[ExternalStatus]
           ,[Active]
           ,[RowOrder])
     VALUES
           ('Orders', 'Cancel Request', null, 'Cancel Request', 'Cancel_Request', null, 1, 'Cancel Request', 1, 1400)
GO

UPDATE SeriesModelColors SET ThumbnailPath = sm.ThumbnailPath
from SeriesModelColors smc
Left outer Join SeriesModel sm on sm.Id = smc.SeriesModelId
GO

UPDATE EmailTemplates
SET Template ='<!DOCTYPE html>  
<html lang=""en"" xmlns=""http://www.w3.org/1999/xhtml"" xmlns:o=""urn:schemas-microsoft-com:office:office"">
<head>
<meta charset=""utf-8"">
<meta name=""viewport"" content=""width=device-width,initial-scale=1"">
<meta name=""x-apple-disable-message-reformatting"">
<title>LOGIN PAGE</title>
<!--[if mso]>    
<style> table {border-collapse:collapse;border-spacing:0;border:none;margin:0;}  div, td {padding:0;}  div {margin:0 !important;} </style>
<noscript>
<xml>
 <o:OfficeDocumentSettings>
 <o:PixelsPerInch>96</o:PixelsPerInch>
 </o:OfficeDocumentSettings>
</xml>
</noscript>
<![endif]-->        
<style>  table,  td,  div,  h1, p { font-family: Arial, sans-serif; }  @media screen and (max-width: 530px) { .unsub {    display: block;    padding: 8px;   margin-top: 14px; border-radius: 6px;  text-decoration: none !important;   font-weight: bold; } .col-lge {  max-width: 100% !important; }  }  @media screen and (min-width: 531px) { .col-sml {   max-width: 27% !important;  }    .col-lge {   max-width: 73% !important;  }  } </style>
   </head>
   <body style=""margin:0;padding:0;word-spacing:normal; background-color: #bbbbbb;"">
      <div role=""article"" aria-roledescription=""email"" lang=""en""          style=""text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;   background-color: #bbbbbb;"">
         <table role=""presentation"" style=""width:100%;border:none;border-spacing:0;"">
            <tr>
               <td align=""center"" style=""padding:0;"">
                  <!--[if mso]>            
                  <table role=""presentation"" align=""center"" style=""width:600px;"">
                     <tr>
                        <td>
                           <![endif]-->                      
                           <table role=""presentation"" style=""width:94%;max-width:600px;border:none;border-spacing:0;text-align:left; padding-top: 50px;         font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;"">
                              <tr>
                                 <td style=""padding:20px;text-align:center;font-size:20px;font-weight:bold;"">  <a href=""#"" style=""text-decoration:none; color: #000000; margin-bottom:18px;""></a>    </td>
                              </tr>
                              <tr>
                                 <td style=""padding:20px;text-align:center;font-size:20px;font-weight:bold;   background-color:#ffffff;  "">
                                    <p style=""margin:0; ""> LOGIN OTP </a>   </p>
                                 </td>
                              </tr>
                              <tr>
                                 <td style=""padding:0;font-size:24px;line-height:28px;font-weight:bold;background-color:#ffffff;"">   <a href=""http://www.example.com/"" style=""text-decoration:none;""><img      src=""Login image.png"" width=""450"",height=""450"" alt=""""    style=""margin:0px auto;width:150px;height:auto;display:block;border:none;text-decoration:none;color:#363636;""></a>    </td>
                              </tr>
                              <td style=""padding:30px;background-color:#ffffff;"">
                                 <h1                                  style=""margin-top:0;margin-bottom:16px;font-size:26px;line-height:50px;font-weight:bold;letter-spacing:-0.02em;"">    Dear {Customer},</h1>
                                 <p style=""margin:0; margin-bottom:25px;""> Please use {OTP} to complete the login process.</p>
                                 <p style=""margin:0; margin-bottom:18px;""> Kindly ignore this message,if not initiated by you.</p>
                                 <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">      </p>
                                 <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                                 
                              </td>
                              </tr>                
                              <tr>
                                 <td style=""padding: 5px 30px 11px 30px;font-size:0;background-color:#ffffff; "">
                                    <!--[if mso]>                  
                                    <table role=""presentation"" width=""100%"">
                                       <tr>
                                          <td style=""width:145px;"" align=""left"" valign=""top"">
                                             <![endif]-->     <!--[if mso]>                  
                                          </td>
                                          <td style=""width:395px;padding-bottom:20px;"" valign=""top"">
                                             <![endif]-->                      
                                             <div class=""col-lge""     style=""display:inline-block;width:100%;max-width:395px;vertical-align:top; font-family:Arial,sans-serif;font-size:16px; color:#363636;"">
                                                <p style=""margin-top:0;margin-bottom:0;"">Thank you,</p>
                                                <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">       DOFY TEAM</p>
                                             </div>
                                             <!--[if mso]>                  
                                          </td>
                                       </tr>
                                    </table>
                                    <![endif]-->                  
                                 </td>
                              </tr>
                              <!-- START FOOTER -->              
                              <tr>
                                 <td style=""padding:15px;text-align:center;font-size:12px;background-color:#1b1b1b;color:#cccccc;"">
                                    <p style=""margin:0 0 8px 0;"">  <a href=""http://www.facebook.com/"" style=""text-decoration:none;"">      <img src=""https://assets.codepen.io/210284/facebook_1.png"" width=""40"" height=""40"" alt=""f""      style=""display:inline-block;color:#cccccc;""></a>  <a href=""http://www.twitter.com/"" style=""text-decoration:none;"">   <img src=""https://assets.codepen.io/210284/twitter_1.png"" width=""40"" height=""40"" alt=""t""    style=""display:inline-block;color:#cccccc;""></a>   </p>
                                    <p style=""margin:8px 0 8px 0;font-size:14px;line-height:20px;"">         DOFY         </p>
                                    <p style=""margin:0;font-size:14px;line-height:20px;"">&reg; Powered by <a class=""unsub""         href=""https://www.inventsoftlabs.com/home""   style=""color:hsl(266, 100%, 56%);text-decoration:none;"">Invent SoftLabs (India) Private Limited</a>      </p>
                                 </td>
                              </tr>
                              <!-- END FOOTER -->            
                           </table>
                           <!--[if mso]>            
                        </td>
                     </tr>
                  </table>
                  <![endif]-->          
               </td>
            </tr>
         </table>
      </div>
   </body>
</html>'
WHERE Id=1;
GO

UPDATE EmailTemplates
SET Template ='<!DOCTYPE html>  
<html lang=""en"" xmlns=""http://www.w3.org/1999/xhtml"" xmlns:o=""urn:schemas-microsoft-com:office:office"">
   <head>
      <meta charset=""utf-8"">
      <meta name=""viewport"" content=""width=device-width,initial-scale=1"">
      <meta name=""x-apple-disable-message-reformatting"">
      <title>ORDER PLACED</title>
      <!--[if mso]>    
      <style>      table {border-collapse:collapse;border-spacing:0;border:none;margin:0;}      div, td {padding:0;}      div {margin:0 !important;}    </style>
      <noscript>
         <xml>
            <o:OfficeDocumentSettings>
               <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
         </xml>
      </noscript>
      <![endif]-->        
      <style>    table,   td,   div,    h1,    p {    font-family: Arial, sans-serif;    }  @media screen and (max-width: 530px) {   .unsub {   display: block;     padding: 8px;    margin-top: 14px;    border-radius: 6px;  text-decoration: none !important;    font-weight: bold;   }   .col-lge { max-width: 100% !important;   }   }   @media screen and (min-width: 531px) {   .col-sml {     max-width: 27% !important;    }  .col-lge {  max-width: 73% !important; } }  </style>
   </head>
   <body style=""margin:0;padding:0;word-spacing:normal; background-color: #bbbbbb;"">
      <div role=""article"" aria-roledescription=""email"" lang=""en""          style=""text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;   background-color: #bbbbbb;"">
         <table role=""presentation"" style=""width:100%;border:none;border-spacing:0;"">
            <tr>
               <td align=""center"" style=""padding:0;"">
                  <!--[if mso]>            
                  <table role=""presentation"" align=""center"" style=""width:600px;"">
                     <tr>
                        <td>
                           <![endif]-->                      
                           <table role=""presentation"" style=""width:94%;max-width:600px;border:none;border-spacing:0;text-align:left; padding-top: 50px;   font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;"">
                              <tr>
                                 <td style=""padding:20px;text-align:center;font-size:20px;font-weight:bold;""> <a href=""#"" style=""text-decoration:none; color: #000000; margin-bottom:18px;""></a>  </td>
                              </tr>
                              <tr>
                                 <td style=""padding:20px;text-align:center;font-size:20px;font-weight:bold;   background-color:#ffffff;  "">
                                    <p style=""margin:0; ""> ORDER PLACED </a> </p>
                                 </td>
                              </tr>
                              <tr>
                                 <td style=""padding:0;font-size:24px;line-height:28px;font-weight:bold; background-color:#ffffff;""> <a href=""http://www.example.com/"" style=""text-decoration:none;""><img   src=""Order placed.png"" width=""150"",height=""150"" alt=""""     style=""margin:0px auto; width:auto;height: 150px;display:block;border:none;text-decoration:none;color:#363636;""></a>   </td>
                              </tr>
                              <td style=""padding:30px;background-color:#ffffff;"">
                                 <h1     style=""margin-top:0;margin-bottom:16px;font-size:26px;line-height:50px;font-weight:bold;letter-spacing:-0.02em;"">   Dear {Customer},</h1>
                                 <p style=""margin:0; margin-bottom:25px;""> You have scheduled pick up of your {Model/Variant}.</p>
                                 <p style=""margin:0; margin-bottom:18px;""> For any other queries contact us{DOFYU Contact number}.</p>
                                 <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">   </p>
                                 <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                                 
                              </td>
                              </tr>                
                              <tr>
                                 <td style=""padding: 5px 30px 11px 30px;font-size:0;background-color:#ffffff; "">
                                    <!--[if mso]>                  
                                    <table role=""presentation"" width=""100%"">
                                       <tr>
                                          <td style=""width:145px;"" align=""left"" valign=""top"">
                                             <![endif]-->           <!--[if mso]>                  
                                          </td>
                                          <td style=""width:395px;padding-bottom:20px;"" valign=""top"">
                                             <![endif]-->                      
                                             <div class=""col-lge""   style=""display:inline-block;width:100%;max-width:395px;vertical-align:top; font-family:Arial,sans-serif;font-size:16px; color:#363636;"">
                                                <p style=""margin-top:0;margin-bottom:0;"">Thank you,</p>
                                                <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">  DOFYU TEAM</p>
                                             </div>
                                             <!--[if mso]>                  
                                          </td>
                                       </tr>
                                    </table>
                                    <![endif]-->                  
                                 </td>
                              </tr>
                              <!-- START FOOTER -->              
                              <tr>
                                 <td style=""padding:15px;text-align:center;font-size:12px;background-color:#1b1b1b;color:#cccccc;"">
                                    <p style=""margin:0 0 8px 0;"">   <a href=""http://www.facebook.com/"" style=""text-decoration:none;"">  <img src=""https://assets.codepen.io/210284/facebook_1.png"" width=""40"" height=""40"" alt=""f""     style=""display:inline-block;color:#cccccc;""></a> <a href=""http://www.twitter.com/"" style=""text-decoration:none;""> <img src=""https://assets.codepen.io/210284/twitter_1.png"" width=""40"" height=""40"" alt=""t""     style=""display:inline-block;color:#cccccc;""></a> </p>
                                    <p style=""margin:8px 0 8px 0;font-size:14px;line-height:20px;"">   DOFY  </p>
                                    <p style=""margin:0;font-size:14px;line-height:20px;"">&reg; Powered by <a class=""unsub""  href=""https://www.inventsoftlabs.com/home""   style=""color:hsl(266, 100%, 56%);text-decoration:none;"">Invent SoftLabs (India) Private Limited</a>  </p>
                                 </td>
                              </tr>
                              <!-- END FOOTER -->            
                           </table>
                           <!--[if mso]>            
                        </td>
                     </tr>
                  </table>
                  <![endif]-->          
               </td>
            </tr>
         </table>
      </div>
   </body>
</html>'
WHERE Id=2;
GO

UPDATE EmailTemplates
SET Template ='<!DOCTYPE html>  
<html lang=""en"" xmlns=""http://www.w3.org/1999/xhtml"" xmlns:o=""urn:schemas-microsoft-com:office:office"">
   <head>
      <meta charset=""utf-8"">
      <meta name=""viewport"" content=""width=device-width,initial-scale=1"">
      <meta name=""x-apple-disable-message-reformatting"">
      <!--[if mso]>    
      <style>      table {border-collapse:collapse;border-spacing:0;border:none;margin:0;}      div, td {padding:0;}      div {margin:0 !important;}    </style>
      <noscript>
         <xml>
            <o:OfficeDocumentSettings>
               <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
         </xml>
      </noscript>
      <![endif]-->        
      <style> table,  td,   div,    h1,    p {   font-family: Arial, sans-serif; }     @media screen and (max-width: 530px) {  .unsub {    display: block;    padding: 8px;    margin-top: 14px;    border-radius: 6px;   text-decoration: none !important;   font-weight: bold;  }   .col-lge {  max-width: 100% !important;   }    }     @media screen and (min-width: 531px) {  .col-sml { max-width: 27% !important;  }    .col-lge {  max-width: 73% !important;  }  }  </style>
   </head>
   <body style=""margin:0;padding:0;word-spacing:normal; background-color: #bbbbbb;"">
      <div role=""article"" aria-roledescription=""email"" lang=""en""          style=""text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;   background-color: #bbbbbb;"">
         <table role=""presentation"" style=""width:100%;border:none;border-spacing:0;"">
            <tr>
               <td align=""center"" style=""padding:0;"">
                  <!--[if mso]>            
                  <table role=""presentation"" align=""center"" style=""width:600px;"">
                     <tr>
                        <td>
                           <![endif]-->                      
                           <table role=""presentation"" style=""width:94%;max-width:600px;border:none;border-spacing:0;text-align:left; padding-top: 50px; font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;"">
                              <tr>
                                 <td style=""padding:20px;text-align:center;font-size:20px;font-weight:bold;""> <a href=""#"" style=""text-decoration:none; color: #000000; margin-bottom:18px;""></a>    </td>
                              </tr>
                              <tr>
                                 <td style=""padding:20px;text-align:center;font-size:20px;font-weight:bold;   background-color:#ffffff;  "">
                                    <p style=""margin:0; ""> ORDER RESCHEDULED </a>  </p>
                                 </td>
                              </tr>
                              <tr>
                                 <td style=""padding:0;font-size:24px;line-height:28px;font-weight:bold; background-color:#ffffff; "">    <a href=""http://www.example.com/"" style=""text-decoration:none;""><img   src=""rescheduled-rectangular-stamp-rescheduled-rectangular-stamp-textured-red-seal-text-isolated-white-background-vector-105966586.jpg"" width=""150"",height=""150"" alt=""""   style=""margin:0px auto; width: 150px;height:auto;display:block;border:none;text-decoration:none;color:#363636;""></a> </td>
                              </tr>
                              <td style=""padding:30px;background-color:#ffffff;"">
                                 <h1                                  style=""margin-top:0;margin-bottom:16px;font-size:26px;line-height:50px;font-weight:bold;letter-spacing:-0.02em;"">  Dear {Customer},</h1>
                                 <p style=""margin:0; margin-bottom:25px;""> You have rescheduled pick up of your order {OrderNo} for {Appointment date}.</p>
                                 <p style=""margin:0; margin-bottom:18px;""> For any other queries contact us{DOFYU Contact number}.</p>
                                 <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">   </p>
                                 <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                                 
                              </td>
                              </tr>                
                              <tr>
                                 <td style=""padding: 5px 30px 11px 30px;font-size:0;background-color:#ffffff; "">
                                    <!--[if mso]>                  
                                    <table role=""presentation"" width=""100%"">
                                       <tr>
                                          <td style=""width:145px;"" align=""left"" valign=""top"">
                                             <![endif]-->                        <!--[if mso]>                  
                                          </td>
                                          <td style=""width:395px;padding-bottom:20px;"" valign=""top"">
                                             <![endif]-->                      
                                             <div class=""col-lge"" style=""display:inline-block;width:100%;max-width:395px;vertical-align:top; font-family:Arial,sans-serif;font-size:16px; color:#363636;"">
                                                <p style=""margin-top:0;margin-bottom:0;"">Thank you,</p>
                                                <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">  DOFYU TEAM</p>
                                             </div>
                                             <!--[if mso]>                  
                                          </td>
                                       </tr>
                                    </table>
                                    <![endif]-->                  
                                 </td>
                              </tr>
                              <!-- START FOOTER -->              
                              <tr>
                                 <td style=""padding:15px;text-align:center;font-size:12px;background-color:#1b1b1b;color:#cccccc;"">
                                    <p style=""margin:0 0 8px 0;"">  <a href=""http://www.facebook.com/"" style=""text-decoration:none;""> <img src=""https://assets.codepen.io/210284/facebook_1.png"" width=""40"" height=""40"" alt=""f""   style=""display:inline-block;color:#cccccc;""></a>  <a href=""http://www.twitter.com/"" style=""text-decoration:none;""> <img src=""https://assets.codepen.io/210284/twitter_1.png"" width=""40"" height=""40"" alt=""t""  style=""display:inline-block;color:#cccccc;""></a>   </p>
                                    <p style=""margin:8px 0 8px 0;font-size:14px;line-height:20px;"">    DOFY      </p>
                                    <p style=""margin:0;font-size:14px;line-height:20px;"">&reg; Powered by <a class=""unsub""   href=""https://www.inventsoftlabs.com/home""   style=""color:hsl(266, 100%, 56%);text-decoration:none;"">Invent SoftLabs (India) Private Limited</a>   </p>
                                 </td>
                              </tr>
                              <!-- END FOOTER -->            
                           </table>
                           <!--[if mso]>            
                        </td>
                     </tr>
                  </table>
                  <![endif]-->          
               </td>
            </tr>
         </table>
      </div>
   </body>
</html>'
WHERE Id=3;
GO

UPDATE EmailTemplates
SET Template ='<!DOCTYPE html>  
<html lang=""en"" xmlns=""http://www.w3.org/1999/xhtml"" xmlns:o=""urn:schemas-microsoft-com:office:office"">
   <head>
      <meta charset=""utf-8"">
      <meta name=""viewport"" content=""width=device-width,initial-scale=1"">
      <meta name=""x-apple-disable-message-reformatting"">
      <!--[if mso]>    
      <style> table {border-collapse:collapse;border-spacing:0;border:none;margin:0;}  div, td {padding:0;} div {margin:0 !important;} </style>
      <noscript>
         <xml>
            <o:OfficeDocumentSettings>
               <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
         </xml>
      </noscript>
      <![endif]-->        
      <style> table,  td, div, h1, p {  font-family: Arial, sans-serif; }   @media screen and (max-width: 530px) {  .unsub {    display: block;   padding: 8px;   margin-top: 14px;   border-radius: 6px;  text-decoration: none !important;   font-weight: bold;   } .col-lge {   max-width: 100% !important; }   }   @media screen and (min-width: 531px) { .col-sml { max-width: 27% !important; }  .col-lge {  max-width: 73% !important;   }  } </style>
   </head>
   <body style=""margin:0;padding:0;word-spacing:normal; background-color: #bbbbbb;"">
      <div role=""article"" aria-roledescription=""email"" lang=""en""          style=""text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;   background-color: #bbbbbb;"">
         <table role=""presentation"" style=""width:100%;border:none;border-spacing:0;"">
            <tr>
               <td align=""center"" style=""padding:0;"">
                  <!--[if mso]>            
                  <table role=""presentation"" align=""center"" style=""width:600px;"">
                     <tr>
                        <td>
                           <![endif]-->                      
                           <table role=""presentation"" style=""width:94%;max-width:600px;border:none;border-spacing:0;text-align:left; padding-top: 50px;   font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;"">
                              <tr>
                                 <td style=""padding:20px;text-align:center;font-size:20px;font-weight:bold;""> <a href=""#"" style=""text-decoration:none; color: #000000; margin-bottom:18px;""></a> </td>
                              </tr>
                              <tr>
                                 <td style=""padding:20px;text-align:center;font-size:20px;font-weight:bold;  background-color:#ffffff;  "">
                                    <p style=""margin:0; ""> ORDER CANCELLED </a> </p>
                                 </td>
                              </tr>
                              <tr>
                                 <td style=""padding:0;font-size:24px;line-height:28px;font-weight:bold; background-color:#ffffff;"">  <a href=""http://www.example.com/"" style=""text-decoration:none;""><img src=""Cancellation-Stamp.jpg"" width=""150"",height=""150"" alt="""" style=""margin:0px auto; width: 250px;height:auto;display:block;border:none;text-decoration:none;color:#363636;""></a>  </td>
                              </tr>
                              <td style=""padding:30px;background-color:#ffffff;"">
                                 <h1                                  style=""margin-top:0;margin-bottom:16px;font-size:26px;line-height:50px;font-weight:bold;letter-spacing:-0.02em;"">  Dear {Customer},</h1>
                                 <p style=""margin:0; margin-bottom:25px;""> Your {OrderNo} has been cancelled.</p>
                                 <p style=""margin:0; margin-bottom:18px;""> For any other queries contact us{DOFYU Contact number}.</p>
                                 <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">  </p>
                                 <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                                 
                              </td>
                              </tr>                
                              <tr>
                                 <td style=""padding: 5px 30px 11px 30px;font-size:0;background-color:#ffffff; "">
                                    <!--[if mso]>                  
                                    <table role=""presentation"" width=""100%"">
                                       <tr>
                                          <td style=""width:145px;"" align=""left"" valign=""top"">
                                             <![endif]--> <!--[if mso]>                  
                                          </td>
                                          <td style=""width:395px;padding-bottom:20px;"" valign=""top"">
                                             <![endif]-->                      
                                             <div class=""col-lge""  style=""display:inline-block;width:100%;max-width:395px;vertical-align:top; font-family:Arial,sans-serif;font-size:16px; color:#363636;"">
                                                <p style=""margin-top:0;margin-bottom:0;"">Thank you,</p>
                                                <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;""> DOFY TEAM</p>
                                             </div>
                                             <!--[if mso]>                  
                                          </td>
                                       </tr>
                                    </table>
                                    <![endif]-->                  
                                 </td>
                              </tr>
                              <!-- START FOOTER -->              
                              <tr>
                                 <td style=""padding:15px;text-align:center;font-size:12px;background-color:#1b1b1b;color:#cccccc;"">
                                    <p style=""margin:0 0 8px 0;""> <a href=""http://www.facebook.com/"" style=""text-decoration:none;"">  <img src=""https://assets.codepen.io/210284/facebook_1.png"" width=""40"" height=""40"" alt=""f""   style=""display:inline-block;color:#cccccc;""></a> <a href=""http://www.twitter.com/"" style=""text-decoration:none;""><img src=""https://assets.codepen.io/210284/twitter_1.png"" width=""40"" height=""40"" alt=""t""  style=""display:inline-block;color:#cccccc;""></a>  </p>
                                    <p style=""margin:8px 0 8px 0;font-size:14px;line-height:20px;"">   DOFY  </p>
                                    <p style=""margin:0;font-size:14px;line-height:20px;"">&reg; Powered by <a class=""unsub""    href=""https://www.inventsoftlabs.com/home"" style=""color:hsl(266, 100%, 56%);text-decoration:none;"">Invent SoftLabs (India) Private Limited</a>  </p>
                                 </td>
                              </tr>
                              <!-- END FOOTER -->            
                           </table>
                           <!--[if mso]>            
                        </td>
                     </tr>
                  </table>
                  <![endif]-->          
               </td>
            </tr>
         </table>
      </div>
   </body>
</html>'
WHERE Id=4;
GO

UPDATE EmailTemplates
SET Template ='<!DOCTYPE html>  
<html lang=""en"" xmlns=""http://www.w3.org/1999/xhtml"" xmlns:o=""urn:schemas-microsoft-com:office:office"">
   <head>
      <meta charset=""utf-8"">
      <meta name=""viewport"" content=""width=device-width,initial-scale=1"">
      <meta name=""x-apple-disable-message-reformatting"">
      <!--[if mso]>    
      <style>      table {border-collapse:collapse;border-spacing:0;border:none;margin:0;}      div, td {padding:0;}      div {margin:0 !important;}    </style>
      <noscript>
         <xml>
            <o:OfficeDocumentSettings>
               <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
         </xml>
      </noscript>
      <![endif]-->        
      <style>          table,          td,          div,          h1,          p {              font-family: Arial, sans-serif;          }            @media screen and (max-width: 530px) {              .unsub {                  display: block;                  padding: 8px;                  margin-top: 14px;                  border-radius: 6px;                  text-decoration: none !important;                  font-weight: bold;              }                .col-lge {                  max-width: 100% !important;              }          }            @media screen and (min-width: 531px) {              .col-sml {                  max-width: 27% !important;              }                .col-lge {                  max-width: 73% !important;              }          }      </style>
   </head>
   <body style=""margin:0;padding:0;word-spacing:normal; background-color: #bbbbbb;"">
      <div role=""article"" aria-roledescription=""email"" lang=""en""          style=""text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;   background-color: #bbbbbb;"">
         <table role=""presentation"" style=""width:100%;border:none;border-spacing:0;"">
            <tr>
               <td align=""center"" style=""padding:0;"">
                  <!--[if mso]>            
                  <table role=""presentation"" align=""center"" style=""width:600px;"">
                     <tr>
                        <td>
                           <![endif]-->                      
                           <table role=""presentation"" style=""width:94%;max-width:600px;border:none;border-spacing:0;text-align:left; padding-top: 50px;                          font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;"">
                              <tr>
                                 <td style=""padding:20px;text-align:center;font-size:20px;font-weight:bold;"">                                  <a href=""#"" style=""text-decoration:none; color: #000000; margin-bottom:18px;""></a>                              </td>
                              </tr>
                              <tr>
                                 <td style=""padding:20px;text-align:center;font-size:20px;font-weight:bold;                                  background-color:#ffffff;  "">
                                    <p style=""margin:0; ""> ORDER PENDING </a>                                  </p>
                                 </td>
                              </tr>
                              <tr>
                                 <td style=""padding:0;font-size:24px;line-height:28px;font-weight:bold;background-color:#ffffff;"">                                  <a href=""http://www.example.com/"" style=""text-decoration:none;""><img                                          src=""Pending image.jpg"" width=""150"",height=""150"" alt=""""                                          style=""margin:0px auto; width: 200px;;height:auto;display:block;border:none;text-decoration:none;color:#363636;""></a>                              </td>
                              </tr>
                              <td style=""padding:30px;background-color:#ffffff;"">
                                 <h1                                  style=""margin-top:0;margin-bottom:16px;font-size:26px;line-height:50px;font-weight:bold;letter-spacing:-0.02em;"">                                  Dear {Customer},</h1>
                                 <p style=""margin:0; margin-bottom:25px;""> Address details for your order{Model variant},{Order number} are pending.</p>
                                 <p style=""margin:0; margin-bottom:18px;""> For smoother experience, update your preferred address details now.Visit:{Application URL}</p>
                                 <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                             </p>
                                 <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                                 
                              </td>
                              </tr>                
                              <tr>
                                 <td style=""padding: 5px 30px 11px 30px;font-size:0;background-color:#ffffff; "">
                                    <!--[if mso]>                  
                                    <table role=""presentation"" width=""100%"">
                                       <tr>
                                          <td style=""width:145px;"" align=""left"" valign=""top"">
                                             <![endif]-->                        <!--[if mso]>                  
                                          </td>
                                          <td style=""width:395px;padding-bottom:20px;"" valign=""top"">
                                             <![endif]-->                      
                                             <div class=""col-lge""                          style=""display:inline-block;width:100%;max-width:395px;vertical-align:top; font-family:Arial,sans-serif;font-size:16px; color:#363636;"">
                                                <p style=""margin-top:0;margin-bottom:0;"">Thank you,</p>
                                                <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                              DOFY TEAM</p>
                                             </div>
                                             <!--[if mso]>                  
                                          </td>
                                       </tr>
                                    </table>
                                    <![endif]-->                  
                                 </td>
                              </tr>
                              <!-- START FOOTER -->              
                              <tr>
                                 <td style=""padding:15px;text-align:center;font-size:12px;background-color:#1b1b1b;color:#cccccc;"">
                                    <p style=""margin:0 0 8px 0;"">                            <a href=""http://www.facebook.com/"" style=""text-decoration:none;"">                              <img src=""https://assets.codepen.io/210284/facebook_1.png"" width=""40"" height=""40"" alt=""f""                                  style=""display:inline-block;color:#cccccc;""></a>                            <a href=""http://www.twitter.com/"" style=""text-decoration:none;"">                              <img src=""https://assets.codepen.io/210284/twitter_1.png"" width=""40"" height=""40"" alt=""t""                                  style=""display:inline-block;color:#cccccc;""></a>                        </p>
                                    <p style=""margin:8px 0 8px 0;font-size:14px;line-height:20px;"">                          DOFY              </p>
                                    <p style=""margin:0;font-size:14px;line-height:20px;"">&reg; Powered by <a class=""unsub""                              href=""https://www.inventsoftlabs.com/home""                              style=""color:hsl(266, 100%, 56%);text-decoration:none;"">Invent SoftLabs (India) Private Limited</a>                      </p>
                                 </td>
                              </tr>
                              <!-- END FOOTER -->            
                           </table>
                           <!--[if mso]>            
                        </td>
                     </tr>
                  </table>
                  <![endif]-->          
               </td>
            </tr>
         </table>
      </div>
   </body>
</html>'
WHERE Id=5;
GO

UPDATE EmailTemplates
SET Template ='<!DOCTYPE html>  
<html lang=""en"" xmlns=""http://www.w3.org/1999/xhtml"" xmlns:o=""urn:schemas-microsoft-com:office:office"">
   <head>
      <meta charset=""utf-8"">
      <meta name=""viewport"" content=""width=device-width,initial-scale=1"">
      <meta name=""x-apple-disable-message-reformatting"">
      <!--[if mso]>    
      <style>      table {border-collapse:collapse;border-spacing:0;border:none;margin:0;}      div, td {padding:0;}      div {margin:0 !important;}    </style>
      <noscript>
         <xml>
            <o:OfficeDocumentSettings>
               <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
         </xml>
      </noscript>
      <![endif]-->        
      <style>          table,          td,          div,          h1,          p {              font-family: Arial, sans-serif;          }            @media screen and (max-width: 530px) {              .unsub {                  display: block;                  padding: 8px;                  margin-top: 14px;                  border-radius: 6px;                  text-decoration: none !important;                  font-weight: bold;              }                .col-lge {                  max-width: 100% !important;              }          }            @media screen and (min-width: 531px) {              .col-sml {                  max-width: 27% !important;              }                .col-lge {                  max-width: 73% !important;              }          }      </style>
   </head>
   <body style=""margin:0;padding:0;word-spacing:normal; background-color: #bbbbbb;"">
      <div role=""article"" aria-roledescription=""email"" lang=""en""          style=""text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;   background-color: #bbbbbb;"">
         <table role=""presentation"" style=""width:100%;border:none;border-spacing:0;"">
            <tr>
               <td align=""center"" style=""padding:0;"">
                  <!--[if mso]>            
                  <table role=""presentation"" align=""center"" style=""width:600px;"">
                     <tr>
                        <td>
                           <![endif]-->                      
                           <table role=""presentation"" style=""width:94%;max-width:600px;border:none;border-spacing:0;text-align:left; padding-top: 50px;                          font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;"">
                              <tr>
                                 <td style=""padding:20px;text-align:center;font-size:20px;font-weight:bold;"">                                  <a href=""#"" style=""text-decoration:none; color: #000000; margin-bottom:18px;""></a>                              </td>
                              </tr>
                              <tr>
                                 <td style=""padding:20px;text-align:center;font-size:20px;font-weight:bold;                                  background-color:#ffffff;  "">
                                    <p style=""margin:0; ""> REPORT DELAY </a>                                  </p>
                                 </td>
                              </tr>
                              <tr>
                                 <td style=""padding:0;font-size:24px;line-height:28px;font-weight:bold;background-color:#ffffff;"">                                  <a href=""http://www.example.com/"" style=""text-decoration:none;""><img                                          src=""delay-original.jpg"" width=""150"",height=""150"" alt=""""                                          style=""margin:0px auto;width: 150px;height:auto;display:block;border:none;text-decoration:none;color:#363636;""></a>                              </td>
                              </tr>
                              <td style=""padding:30px;background-color:#ffffff;"">
                                 <h1                                  style=""margin-top:0;margin-bottom:16px;font-size:26px;line-height:50px;font-weight:bold;letter-spacing:-0.02em;"">                                  Dear {Customer},</h1>
                                 <p style=""margin:0; margin-bottom:25px;""> We are extremely sorry for the delay of your order{Model/Varaiant}Example-Apple I phone 5(1GB/32GB),{order no}.Our technician will reach you within{selcted time interval}</p>
                                 <p style=""margin:0; margin-bottom:18px;""> For any other queries contact us at{DOFY contact}</p>
                                 <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                             </p>
                                 <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                                 
                              </td>
                              </tr>                
                              <tr>
                                 <td style=""padding: 5px 30px 11px 30px;font-size:0;background-color:#ffffff; "">
                                    <!--[if mso]>                  
                                    <table role=""presentation"" width=""100%"">
                                       <tr>
                                          <td style=""width:145px;"" align=""left"" valign=""top"">
                                             <![endif]-->                        <!--[if mso]>                  
                                          </td>
                                          <td style=""width:395px;padding-bottom:20px;"" valign=""top"">
                                             <![endif]-->                      
                                             <div class=""col-lge""                          style=""display:inline-block;width:100%;max-width:395px;vertical-align:top; font-family:Arial,sans-serif;font-size:16px; color:#363636;"">
                                                <p style=""margin-top:0;margin-bottom:0;"">Thank you,</p>
                                                <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                              DOFY TEAM</p>
                                             </div>
                                             <!--[if mso]>                  
                                          </td>
                                       </tr>
                                    </table>
                                    <![endif]-->                  
                                 </td>
                              </tr>
                              <!-- START FOOTER -->              
                              <tr>
                                 <td style=""padding:15px;text-align:center;font-size:12px;background-color:#1b1b1b;color:#cccccc;"">
                                    <p style=""margin:0 0 8px 0;"">                            <a href=""http://www.facebook.com/"" style=""text-decoration:none;"">                              <img src=""https://assets.codepen.io/210284/facebook_1.png"" width=""40"" height=""40"" alt=""f""                                  style=""display:inline-block;color:#cccccc;""></a>                            <a href=""http://www.twitter.com/"" style=""text-decoration:none;"">                              <img src=""https://assets.codepen.io/210284/twitter_1.png"" width=""40"" height=""40"" alt=""t""                                  style=""display:inline-block;color:#cccccc;""></a>                        </p>
                                    <p style=""margin:8px 0 8px 0;font-size:14px;line-height:20px;"">                          DOFY              </p>
                                    <p style=""margin:0;font-size:14px;line-height:20px;"">&reg; Powered by <a class=""unsub""                              href=""https://www.inventsoftlabs.com/home""                              style=""color:hsl(266, 100%, 56%);text-decoration:none;"">Invent SoftLabs (India) Private Limited</a>                      </p>
                                 </td>
                              </tr>
                              <!-- END FOOTER -->            
                           </table>
                           <!--[if mso]>            
                        </td>
                     </tr>
                  </table>
                  <![endif]-->          
               </td>
            </tr>
         </table>
      </div>
   </body>
</html>'
WHERE Id=6;
GO

UPDATE EmailTemplates
SET Template ='<!DOCTYPE html>  
<html lang=""en"" xmlns=""http://www.w3.org/1999/xhtml"" xmlns:o=""urn:schemas-microsoft-com:office:office"">
   <head>
      <meta charset=""utf-8"">
      <meta name=""viewport"" content=""width=device-width,initial-scale=1"">
      <meta name=""x-apple-disable-message-reformatting"">
      <!--[if mso]>    
      <style>      table {border-collapse:collapse;border-spacing:0;border:none;margin:0;}      div, td {padding:0;}      div {margin:0 !important;}    </style>
      <noscript>
         <xml>
            <o:OfficeDocumentSettings>
               <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
         </xml>
      </noscript>
      <![endif]-->        
      <style>          table,          td,          div,          h1,          p {              font-family: Arial, sans-serif;          }            @media screen and (max-width: 530px) {              .unsub {                  display: block;                  padding: 8px;                  margin-top: 14px;                  border-radius: 6px;                  text-decoration: none !important;                  font-weight: bold;              }                .col-lge {                  max-width: 100% !important;              }          }            @media screen and (min-width: 531px) {              .col-sml {                  max-width: 27% !important;              }                .col-lge {                  max-width: 73% !important;              }          }      </style>
   </head>
   <body style=""margin:0;padding:0;word-spacing:normal; background-color: #bbbbbb;"">
      <div role=""article"" aria-roledescription=""email"" lang=""en""          style=""text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;   background-color: #bbbbbb;"">
         <table role=""presentation"" style=""width:100%;border:none;border-spacing:0;"">
            <tr>
               <td align=""center"" style=""padding:0;"">
                  <!--[if mso]>            
                  <table role=""presentation"" align=""center"" style=""width:600px;"">
                     <tr>
                        <td>
                           <![endif]-->                      
                           <table role=""presentation"" style=""width:94%;max-width:600px;border:none;border-spacing:0;text-align:left; padding-top: 50px;                          font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;"">
                              <tr>
                                 <td style=""padding:20px;text-align:center;font-size:20px;font-weight:bold;"">                                  <a href=""#"" style=""text-decoration:none; color: #000000; margin-bottom:18px;""></a>                              </td>
                              </tr>
                              <tr>
                                 <td style=""padding:20px;text-align:center;font-size:20px;font-weight:bold;                                  background-color:#ffffff;  "">
                                    <p style=""margin:0; ""> AMOUNT REQUOTE </a>                                  </p>
                                 </td>
                              </tr>
                              <tr>
                                 <td style=""padding:0;font-size:24px;line-height:28px;font-weight:bold;background-color:#ffffff;"">                                  <a href=""http://www.example.com/"" style=""text-decoration:none;""><img                                          src=""download.jpg"" width=""150"",height=""150"" alt=""""                                          style=""margin:0px auto; width:150px;height:auto;display:block;border:none;text-decoration:none;color:#363636;""></a>                              </td>
                              </tr>
                              <td style=""padding:30px;background-color:#ffffff;"">
                                 <h1                                  style=""margin-top:0;margin-bottom:16px;font-size:26px;line-height:50px;font-weight:bold;letter-spacing:-0.02em;"">                                  Dear {Customer},</h1>
                                 <p style=""margin:0; margin-bottom:25px;""> We have reqouted the amount{Original amount} to {Requoted amount} for your DOFY {Model/Variant},{Order no}.</p>
                                 <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                             </p>
                                 <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                                 
                              </td>
                              </tr>                
                              <tr>
                                 <td style=""padding: 5px 30px 11px 30px;font-size:0;background-color:#ffffff; "">
                                    <!--[if mso]>                  
                                    <table role=""presentation"" width=""100%"">
                                       <tr>
                                          <td style=""width:145px;"" align=""left"" valign=""top"">
                                             <![endif]-->                        <!--[if mso]>                  
                                          </td>
                                          <td style=""width:395px;padding-bottom:20px;"" valign=""top"">
                                             <![endif]-->                      
                                             <div class=""col-lge""                          style=""display:inline-block;width:100%;max-width:395px;vertical-align:top; font-family:Arial,sans-serif;font-size:16px; color:#363636;"">
                                                <p style=""margin-top:0;margin-bottom:0;"">Thank you,</p>
                                                <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                              DOFY TEAM</p>
                                             </div>
                                             <!--[if mso]>                  
                                          </td>
                                       </tr>
                                    </table>
                                    <![endif]-->                  
                                 </td>
                              </tr>
                              <!-- START FOOTER -->              
                              <tr>
                                 <td style=""padding:15px;text-align:center;font-size:12px;background-color:#1b1b1b;color:#cccccc;"">
                                    <p style=""margin:0 0 8px 0;"">                            <a href=""http://www.facebook.com/"" style=""text-decoration:none;"">                              <img src=""https://assets.codepen.io/210284/facebook_1.png"" width=""40"" height=""40"" alt=""f""                                  style=""display:inline-block;color:#cccccc;""></a>                            <a href=""http://www.twitter.com/"" style=""text-decoration:none;"">                              <img src=""https://assets.codepen.io/210284/twitter_1.png"" width=""40"" height=""40"" alt=""t""                                  style=""display:inline-block;color:#cccccc;""></a>                        </p>
                                    <p style=""margin:8px 0 8px 0;font-size:14px;line-height:20px;"">                          DOFY              </p>
                                    <p style=""margin:0;font-size:14px;line-height:20px;"">&reg; Powered by <a class=""unsub""                              href=""https://www.inventsoftlabs.com/home""                              style=""color:hsl(266, 100%, 56%);text-decoration:none;"">Invent SoftLabs (India) Private Limited</a>                      </p>
                                 </td>
                              </tr>
                              <!-- END FOOTER -->            
                           </table>
                           <!--[if mso]>            
                        </td>
                     </tr>
                  </table>
                  <![endif]-->          
               </td>
            </tr>
         </table>
      </div>
   </body>
</html>'
WHERE Id=7;
GO


UPDATE EmailTemplates
SET Template ='<!DOCTYPE html>  
<html lang=""en"" xmlns=""http://www.w3.org/1999/xhtml"" xmlns:o=""urn:schemas-microsoft-com:office:office"">
   <head>
      <meta charset=""utf-8"">
      <meta name=""viewport"" content=""width=device-width,initial-scale=1"">
      <meta name=""x-apple-disable-message-reformatting"">
      <!--[if mso]>    
      <style>      table {border-collapse:collapse;border-spacing:0;border:none;margin:0;}      div, td {padding:0;}      div {margin:0 !important;}    </style>
      <noscript>
         <xml>
            <o:OfficeDocumentSettings>
               <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
         </xml>
      </noscript>
      <![endif]-->        
      <style>          table,          td,          div,          h1,          p {              font-family: Arial, sans-serif;          }            @media screen and (max-width: 530px) {              .unsub {                  display: block;                  padding: 8px;                  margin-top: 14px;                  border-radius: 6px;                  text-decoration: none !important;                  font-weight: bold;              }                .col-lge {                  max-width: 100% !important;              }          }            @media screen and (min-width: 531px) {              .col-sml {                  max-width: 27% !important;              }                .col-lge {                  max-width: 73% !important;              }          }      </style>
   </head>
   <body style=""margin:0;padding:0;word-spacing:normal; background-color: #bbbbbb;"">
      <div role=""article"" aria-roledescription=""email"" lang=""en""          style=""text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;   background-color: #bbbbbb;"">
         <table role=""presentation"" style=""width:100%;border:none;border-spacing:0;"">
            <tr>
               <td align=""center"" style=""padding:0;"">
                  <!--[if mso]>            
                  <table role=""presentation"" align=""center"" style=""width:600px;"">
                     <tr>
                        <td>
                           <![endif]-->                      
                           <table role=""presentation"" style=""width:94%;max-width:600px;border:none;border-spacing:0;text-align:left; padding-top: 50px;                          font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;"">
                              <tr>
                                 <td style=""padding:20px;text-align:center;font-size:20px;font-weight:bold;"">                                  <a href=""#"" style=""text-decoration:none; color: #000000; margin-bottom:18px;""></a>                              </td>
                              </tr>
                              <tr>
                                 <td style=""padding:20px;text-align:center;font-size:20px;font-weight:bold;                                  background-color:#ffffff;  "">
                                    <p style=""margin:0; ""> PAYMENT PROCESS OTP </a>                                  </p>
                                 </td>
                              </tr>
                              <tr>
                                 <td style=""padding:0;font-size:24px;line-height:28px;font-weight:bold;background-color:#ffffff;"">                                  <a href=""http://www.example.com/"" style=""text-decoration:none;""><img                                          src=""OTP payment.jpg"" width=""150"",height=""150"" alt=""""                                          style=""margin:0px auto; width: 250px;height:auto;display:block;border:none;text-decoration:none;color:#363636;""></a>                              </td>
                              </tr>
                              <td style=""padding:30px;background-color:#ffffff;"">
                                 <h1                                  style=""margin-top:0;margin-bottom:16px;font-size:26px;line-height:50px;font-weight:bold;letter-spacing:-0.02em;"">                                  Dear {Customer},</h1>
                                 <p style=""margin:0; margin-bottom:25px;""> Please use {OTP} to complete the payment process.</p>
                                 <p style=""margin:0; margin-bottom:25px;""> Kindly ignore this message , if not inititated by you.</p>
                                 <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                             </p>
                                 <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                                 
                              </td>
                              </tr>                
                              <tr>
                                 <td style=""padding: 5px 30px 11px 30px;font-size:0;background-color:#ffffff; "">
                                    <!--[if mso]>                  
                                    <table role=""presentation"" width=""100%"">
                                       <tr>
                                          <td style=""width:145px;"" align=""left"" valign=""top"">
                                             <![endif]-->                        <!--[if mso]>                  
                                          </td>
                                          <td style=""width:395px;padding-bottom:20px;"" valign=""top"">
                                             <![endif]-->                      
                                             <div class=""col-lge""                          style=""display:inline-block;width:100%;max-width:395px;vertical-align:top; font-family:Arial,sans-serif;font-size:16px; color:#363636;"">
                                                <p style=""margin-top:0;margin-bottom:0;"">Thank you,</p>
                                                <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                              DOFY TEAM</p>
                                             </div>
                                             <!--[if mso]>                  
                                          </td>
                                       </tr>
                                    </table>
                                    <![endif]-->                  
                                 </td>
                              </tr>
                              <!-- START FOOTER -->              
                              <tr>
                                 <td style=""padding:15px;text-align:center;font-size:12px;background-color:#1b1b1b;color:#cccccc;"">
                                    <p style=""margin:0 0 8px 0;"">                            <a href=""http://www.facebook.com/"" style=""text-decoration:none;"">                              <img src=""https://assets.codepen.io/210284/facebook_1.png"" width=""40"" height=""40"" alt=""f""                                  style=""display:inline-block;color:#cccccc;""></a>                            <a href=""http://www.twitter.com/"" style=""text-decoration:none;"">                              <img src=""https://assets.codepen.io/210284/twitter_1.png"" width=""40"" height=""40"" alt=""t""                                  style=""display:inline-block;color:#cccccc;""></a>                        </p>
                                    <p style=""margin:8px 0 8px 0;font-size:14px;line-height:20px;"">                          DOFY              </p>
                                    <p style=""margin:0;font-size:14px;line-height:20px;"">&reg; Powered by <a class=""unsub""                              href=""https://www.inventsoftlabs.com/home""                              style=""color:hsl(266, 100%, 56%);text-decoration:none;"">Invent SoftLabs (India) Private Limited</a>                      </p>
                                 </td>
                              </tr>
                              <!-- END FOOTER -->            
                           </table>
                           <!--[if mso]>            
                        </td>
                     </tr>
                  </table>
                  <![endif]-->          
               </td>
            </tr>
         </table>
      </div>
   </body>
</html>'
WHERE Id=8;
GO

UPDATE EmailTemplates
SET Template ='<!DOCTYPE html>  
<html lang=""en"" xmlns=""http://www.w3.org/1999/xhtml"" xmlns:o=""urn:schemas-microsoft-com:office:office"">
   <head>
      <meta charset=""utf-8"">
      <meta name=""viewport"" content=""width=device-width,initial-scale=1"">
      <meta name=""x-apple-disable-message-reformatting"">
      <!--[if mso]>    
      <style>      table {border-collapse:collapse;border-spacing:0;border:none;margin:0;}      div, td {padding:0;}      div {margin:0 !important;}    </style>
      <noscript>
         <xml>
            <o:OfficeDocumentSettings>
               <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
         </xml>
      </noscript>
      <![endif]-->        
      <style>          table,          td,          div,          h1,          p {              font-family: Arial, sans-serif;          }            @media screen and (max-width: 530px) {              .unsub {                  display: block;                  padding: 8px;                  margin-top: 14px;                  border-radius: 6px;                  text-decoration: none !important;                  font-weight: bold;              }                .col-lge {                  max-width: 100% !important;              }          }            @media screen and (min-width: 531px) {              .col-sml {                  max-width: 27% !important;              }                .col-lge {                  max-width: 73% !important;              }          }      </style>
   </head>
   <body style=""margin:0;padding:0;word-spacing:normal; background-color: #bbbbbb;"">
      <div role=""article"" aria-roledescription=""email"" lang=""en""          style=""text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;   background-color: #bbbbbb;"">
         <table role=""presentation"" style=""width:100%;border:none;border-spacing:0;"">
            <tr>
               <td align=""center"" style=""padding:0;"">
                  <!--[if mso]>            
                  <table role=""presentation"" align=""center"" style=""width:600px;"">
                     <tr>
                        <td>
                           <![endif]-->                      
                           <table role=""presentation"" style=""width:94%;max-width:600px;border:none;border-spacing:0;text-align:left; padding-top: 50px;                          font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;"">
                              <tr>
                                 <td style=""padding:20px;text-align:center;font-size:20px;font-weight:bold;"">                                  <a href=""#"" style=""text-decoration:none; color: #000000; margin-bottom:18px;""></a>                              </td>
                              </tr>
                              <tr>
                                 <td style=""padding:20px;text-align:center;font-size:20px;font-weight:bold;                                  background-color:#ffffff;  "">
                                    <p style=""margin:0; ""> PAYMENT SUCCESSFUL </a>                                  </p>
                                 </td>
                              </tr>
                              <tr>
                                 <td style=""padding:0;font-size:24px;line-height:28px;font-weight:bold;background-color:#ffffff;"">                                  <a href=""http://www.example.com/"" style=""text-decoration:none;""><img                                          src=""images.png"" width=""150"",height=""150"" alt=""""                                          style=""margin:0px auto;width: 150px;height:auto;display:block;border:none;text-decoration:none;color:#363636;""></a>                              </td>
                              </tr>
                              <td style=""padding:30px;background-color:#ffffff;"">
                                 <h1                                  style=""margin-top:0;margin-bottom:16px;font-size:26px;line-height:50px;font-weight:bold;letter-spacing:-0.02em;"">                                  Dear {Customer},</h1>
                                 <p style=""margin:0; margin-bottom:25px;""> Payment for DOFY order{Model/Variant},{Order no} is {Amount} has been processed successful.</p>
                                 
                                 <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                             </p>
                                 <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                                 
                              </td>
                              </tr>                
                              <tr>
                                 <td style=""padding: 5px 30px 11px 30px;font-size:0;background-color:#ffffff; "">
                                    <!--[if mso]>                  
                                    <table role=""presentation"" width=""100%"">
                                       <tr>
                                          <td style=""width:145px;"" align=""left"" valign=""top"">
                                             <![endif]-->                        <!--[if mso]>                  
                                          </td>
                                          <td style=""width:395px;padding-bottom:20px;"" valign=""top"">
                                             <![endif]-->                      
                                             <div class=""col-lge""                          style=""display:inline-block;width:100%;max-width:395px;vertical-align:top; font-family:Arial,sans-serif;font-size:16px; color:#363636;"">
                                                <p style=""margin-top:0;margin-bottom:0;"">Thank you,</p>
                                                <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                              DOFY TEAM</p>
                                             </div>
                                             <!--[if mso]>                  
                                          </td>
                                       </tr>
                                    </table>
                                    <![endif]-->                  
                                 </td>
                              </tr>
                              <!-- START FOOTER -->              
                              <tr>
                                 <td style=""padding:15px;text-align:center;font-size:12px;background-color:#1b1b1b;color:#cccccc;"">
                                    <p style=""margin:0 0 8px 0;"">                            <a href=""http://www.facebook.com/"" style=""text-decoration:none;"">                              <img src=""https://assets.codepen.io/210284/facebook_1.png"" width=""40"" height=""40"" alt=""f""                                  style=""display:inline-block;color:#cccccc;""></a>                            <a href=""http://www.twitter.com/"" style=""text-decoration:none;"">                              <img src=""https://assets.codepen.io/210284/twitter_1.png"" width=""40"" height=""40"" alt=""t""                                  style=""display:inline-block;color:#cccccc;""></a>                        </p>
                                    <p style=""margin:8px 0 8px 0;font-size:14px;line-height:20px;"">                          DOFY              </p>
                                    <p style=""margin:0;font-size:14px;line-height:20px;"">&reg; Powered by <a class=""unsub""                              href=""https://www.inventsoftlabs.com/home""                              style=""color:hsl(266, 100%, 56%);text-decoration:none;"">Invent SoftLabs (India) Private Limited</a>                      </p>
                                 </td>
                              </tr>
                              <!-- END FOOTER -->            
                           </table>
                           <!--[if mso]>            
                        </td>
                     </tr>
                  </table>
                  <![endif]-->          
               </td>
            </tr>
         </table>
      </div>
   </body>
</html>'
WHERE Id=9;
GO

UPDATE EmailTemplates
SET Template ='<!DOCTYPE html>  
<html lang=""en"" xmlns=""http://www.w3.org/1999/xhtml"" xmlns:o=""urn:schemas-microsoft-com:office:office"">
   <head>
      <meta charset=""utf-8"">
      <meta name=""viewport"" content=""width=device-width,initial-scale=1"">
      <meta name=""x-apple-disable-message-reformatting"">
      <!--[if mso]>    
      <style>      table {border-collapse:collapse;border-spacing:0;border:none;margin:0;}      div, td {padding:0;}      div {margin:0 !important;}    </style>
      <noscript>
         <xml>
            <o:OfficeDocumentSettings>
               <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
         </xml>
      </noscript>
      <![endif]-->        
      <style>          table,          td,          div,          h1,          p {              font-family: Arial, sans-serif;          }            @media screen and (max-width: 530px) {              .unsub {                  display: block;                  padding: 8px;                  margin-top: 14px;                  border-radius: 6px;                  text-decoration: none !important;                  font-weight: bold;              }                .col-lge {                  max-width: 100% !important;              }          }            @media screen and (min-width: 531px) {              .col-sml {                  max-width: 27% !important;              }                .col-lge {                  max-width: 73% !important;              }          }      </style>
   </head>
   <body style=""margin:0;padding:0;word-spacing:normal; background-color: #bbbbbb;"">
      <div role=""article"" aria-roledescription=""email"" lang=""en""          style=""text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;   background-color: #bbbbbb;"">
         <table role=""presentation"" style=""width:100%;border:none;border-spacing:0;"">
            <tr>
               <td align=""center"" style=""padding:0;"">
                  <!--[if mso]>            
                  <table role=""presentation"" align=""center"" style=""width:600px;"">
                     <tr>
                        <td>
                           <![endif]-->                      
                           <table role=""presentation"" style=""width:94%;max-width:600px;border:none;border-spacing:0;text-align:left; padding-top: 50px;                          font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;"">
                              <tr>
                                 <td style=""padding:20px;text-align:center;font-size:20px;font-weight:bold;"">                                  <a href=""#"" style=""text-decoration:none; color: #000000; margin-bottom:18px;""></a>                              </td>
                              </tr>
                              <tr>
                                 <td style=""padding:20px;text-align:center;font-size:20px;font-weight:bold;                                  background-color:#ffffff;  "">
                                    <p style=""margin:0; "">PAYMENT FAILED </a>                                  </p>
                                 </td>
                              </tr>
                              <tr>
                                 <td style=""padding:0;font-size:24px;line-height:28px;font-weight:bold;background-color:#ffffff;"">                                  <a href=""http://www.example.com/"" style=""text-decoration:none;""><img                                          src=""Failed.png"" width=""150"",height=""150"" alt=""""                                          style=""margin:0px auto;width: 150px;height:auto;display:block;border:none;text-decoration:none;color:#363636;""></a>                              </td>
                              </tr>
                              <td style=""padding:30px;background-color:#ffffff;"">
                                 <h1                                  style=""margin-top:0;margin-bottom:16px;font-size:26px;line-height:50px;font-weight:bold;letter-spacing:-0.02em;"">                                  Dear {Customer},</h1>
                                 <p style=""margin:0; margin-bottom:25px;""> Payment for DOFY order{Model/Variant},{Order no} have been failed.</p>
                                 <p style=""margin:0; margin-bottom:25px;""> For any other queries contact us at {DOFY contact no}</p>
                                 <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                             </p>
                                 <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                                 
                              </td>
                              </tr>                
                              <tr>
                                 <td style=""padding: 5px 30px 11px 30px;font-size:0;background-color:#ffffff; "">
                                    <!--[if mso]>                  
                                    <table role=""presentation"" width=""100%"">
                                       <tr>
                                          <td style=""width:145px;"" align=""left"" valign=""top"">
                                             <![endif]-->                        <!--[if mso]>                  
                                          </td>
                                          <td style=""width:395px;padding-bottom:20px;"" valign=""top"">
                                             <![endif]-->                      
                                             <div class=""col-lge""                          style=""display:inline-block;width:100%;max-width:395px;vertical-align:top; font-family:Arial,sans-serif;font-size:16px; color:#363636;"">
                                                <p style=""margin-top:0;margin-bottom:0;"">Thank you,</p>
                                                <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                              DOFY TEAM</p>
                                             </div>
                                             <!--[if mso]>                  
                                          </td>
                                       </tr>
                                    </table>
                                    <![endif]-->                  
                                 </td>
                              </tr>
                              <!-- START FOOTER -->              
                              <tr>
                                 <td style=""padding:15px;text-align:center;font-size:12px;background-color:#1b1b1b;color:#cccccc;"">
                                    <p style=""margin:0 0 8px 0;"">                            <a href=""http://www.facebook.com/"" style=""text-decoration:none;"">                              <img src=""https://assets.codepen.io/210284/facebook_1.png"" width=""40"" height=""40"" alt=""f""                                  style=""display:inline-block;color:#cccccc;""></a>                            <a href=""http://www.twitter.com/"" style=""text-decoration:none;"">                              <img src=""https://assets.codepen.io/210284/twitter_1.png"" width=""40"" height=""40"" alt=""t""                                  style=""display:inline-block;color:#cccccc;""></a>                        </p>
                                    <p style=""margin:8px 0 8px 0;font-size:14px;line-height:20px;"">                          DOFY              </p>
                                    <p style=""margin:0;font-size:14px;line-height:20px;"">&reg; Powered by <a class=""unsub""                              href=""https://www.inventsoftlabs.com/home""                              style=""color:hsl(266, 100%, 56%);text-decoration:none;"">Invent SoftLabs (India) Private Limited</a>                      </p>
                                 </td>
                              </tr>
                              <!-- END FOOTER -->            
                           </table>
                           <!--[if mso]>            
                        </td>
                     </tr>
                  </table>
                  <![endif]-->          
               </td>
            </tr>
         </table>
      </div>
   </body>
</html>'
WHERE Id=10;
GO

UPDATE EmailTemplates
SET Template ='<!DOCTYPE html>
<html lang=""en"" xmlns=""http://www.w3.org/1999/xhtml"" xmlns:o=""urn:schemas-microsoft-com:office:office"">

<head>
   <meta charset=""utf-8"">
   <meta name=""viewport"" content=""width=device-width,initial-scale=1"">
   <meta name=""x-apple-disable-message-reformatting"">
   <!--[if mso]>    
      <style>  table {border-collapse:collapse;border-spacing:0;border:none;margin:0;} div, td {padding:0;}  div {margin:0 !important;} </style>
      <noscript>
         <xml>
            <o:OfficeDocumentSettings>
               <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
         </xml>
      </noscript>
      <![endif]-->
   <style>
      table,
      td,
      div,
      h1,
      p {
         font-family: Arial, sans-serif;
      }

      @media screen and (max-width: 530px) {
         .unsub {
            display: block;
            padding: 8px;
            margin-top: 14px;
            border-radius: 6px;
            text-decoration: none !important;
            font-weight: bold;
         }

         .col-lge {
            max-width: 100% !important;
         }
      }

      @media screen and (min-width: 531px) {
         .col-sml {
            max-width: 27% !important;
         }

         .col-lge {
            max-width: 73% !important;
         }
      }
   </style>
</head>

<body style=""margin:0;padding:0;word-spacing:normal; background-color: #bbbbbb;"">
   <div role=""article"" aria-roledescription=""email"" lang=""en""
      style=""text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;   background-color: #bbbbbb;"">
      <table role=""presentation"" style=""width:100%;border:none;border-spacing:0;"">
         <tr>
            <td align=""center"" style=""padding:0;"">
               <!--[if mso]>            
                  <table role=""presentation"" align=""center"" style=""width:600px;"">
                     <tr>
                        <td>
                    <![endif]-->
               <table role=""presentation""
                  style=""width:94%;max-width:600px;border:none;border-spacing:0;text-align:left; padding-top: 50px;  font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;"">
                  <tr>
                     <td style=""padding:20px;text-align:center;font-size:20px;font-weight:bold;""> <a href=""#""
                           style=""text-decoration:none; color: #000000; margin-bottom:18px;""></a> </td>
                  </tr>
                  <tr>
                     <td
                        style=""padding:20px;text-align:center;font-size:20px;font-weight:bold;    background-color:#ffffff;  "">
                        <p style=""margin:0; ""> ORDER FAILED </a> </p>
                     </td>
                  </tr>
                  <tr>
                     <td style=""padding:0;font-size:24px;line-height:28px;font-weight:bold; background-color:#ffffff;""> <a
                           href=""http://www.example.com/"" style=""text-decoration:none;""><img
                              src=""file:///C:/Users/Hp/Desktop/Login/Failed.png"" width=""150"" ,height=""150"" alt=""""
                              style=""margin: 0px auto;width:auto;height:auto;display:block;border:none;text-decoration:none;color:#363636;background-color:#ffffff;""></a>
                     </td>
                  </tr>
                  <td style=""padding:30px;background-color:#ffffff;"">
                     <h1
                        style=""margin-top:0;margin-bottom:16px;font-size:26px;line-height:50px;font-weight:bold;letter-spacing:-0.02em;"">
                        Dear {Customer},</h1>
                     <p style=""margin:0; margin-bottom:25px;""> Your order {Order no} have been failed.</p>
                     <p style=""margin:0; margin-bottom:25px;""> For any other queries contact us at {DOFY contact no}</p>
                     <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;""> </p>
                     <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">
               </td>
         </tr>
         <tr>
            <td style=""padding: 5px 30px 11px 30px;font-size:0;background-color:#ffffff; "">
               <!--[if mso]>                  
                <table role=""presentation"" width=""100%"">
                    <tr>  <td style=""width:145px;"" align=""left"" valign=""top"">
                <![endif]-->
               <!--[if mso]>                  
                </td>
                <td style=""width:395px;padding-bottom:20px;"" valign=""top"">
               <![endif]-->
               <div class=""col-lge""
                  style=""display:inline-block;width:100%;max-width:395px;vertical-align:top; font-family:Arial,sans-serif;font-size:16px; color:#363636;"">
                  <p style=""margin-top:0;margin-bottom:0;"">Thank you,</p>
                  <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;""> DOFY TEAM</p>
               </div>
               <!--[if mso]>                  
                 </td>
             </tr>
         </table>
      <![endif]-->
            </td>
         </tr>
         <!-- START FOOTER -->
         <tr>
            <td style=""padding:15px;text-align:center;font-size:12px;background-color:#1b1b1b;color:#cccccc;"">
               <p style=""margin:0 0 8px 0;""> <a href=""http://www.facebook.com/"" style=""text-decoration:none;""> <img
                        src=""https://assets.codepen.io/210284/facebook_1.png"" width=""40"" height=""40"" alt=""f""
                        style=""display:inline-block;color:#cccccc;""></a> <a href=""http://www.twitter.com/""
                     style=""text-decoration:none;""> <img src=""https://assets.codepen.io/210284/twitter_1.png"" width=""40""
                        height=""40"" alt=""t"" style=""display:inline-block;color:#cccccc;""></a> </p>
               <p style=""margin:8px 0 8px 0;font-size:14px;line-height:20px;""> DOFY </p>
               <p style=""margin:0;font-size:14px;line-height:20px;"">&reg; Powered by <a class=""unsub""
                     href=""https://www.inventsoftlabs.com/home""
                     style=""color:hsl(266, 100%, 56%);text-decoration:none;"">Invent SoftLabs (India) Private Limited</a>
               </p>
            </td>
         </tr>
         <!-- END FOOTER -->
      </table>
      <!--[if mso]>            
     </td>
    </tr>
   </table>
    <![endif]-->
      </td>
      </tr>
      </table>
   </div>
</body>
</html>'
WHERE Id=11;
GO

UPDATE EmailTemplates
SET Template ='<!DOCTYPE html>  
<html lang=""en"" xmlns=""http://www.w3.org/1999/xhtml"" xmlns:o=""urn:schemas-microsoft-com:office:office"">
   <head>
      <meta charset=""utf-8"">
      <meta name=""viewport"" content=""width=device-width,initial-scale=1"">
      <meta name=""x-apple-disable-message-reformatting"">
      <!--[if mso]>    
      <style>      table {border-collapse:collapse;border-spacing:0;border:none;margin:0;}      div, td {padding:0;}      div {margin:0 !important;}    </style>
      <noscript>
         <xml>
            <o:OfficeDocumentSettings>
               <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
         </xml>
      </noscript>
      <![endif]-->        
      <style>          table,          td,          div,          h1,          p {              font-family: Arial, sans-serif;          }            @media screen and (max-width: 530px) {              .unsub {                  display: block;                  padding: 8px;                  margin-top: 14px;                  border-radius: 6px;                  text-decoration: none !important;                  font-weight: bold;              }                .col-lge {                  max-width: 100% !important;              }          }            @media screen and (min-width: 531px) {              .col-sml {                  max-width: 27% !important;              }                .col-lge {                  max-width: 73% !important;              }          }      </style>
   </head>
   <body style=""margin:0;padding:0;word-spacing:normal; background-color: #bbbbbb;"">
      <div role=""article"" aria-roledescription=""email"" lang=""en""          style=""text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;   background-color: #bbbbbb;"">
         <table role=""presentation"" style=""width:100%;border:none;border-spacing:0;"">
            <tr>
               <td align=""center"" style=""padding:0;"">
                  <!--[if mso]>            
                  <table role=""presentation"" align=""center"" style=""width:600px;"">
                     <tr>
                        <td>
                           <![endif]-->                      
                           <table role=""presentation"" style=""width:94%;max-width:600px;border:none;border-spacing:0;text-align:left; padding-top: 50px;                          font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;"">
                              <tr>
                                 <td style=""padding:20px;text-align:center;font-size:20px;font-weight:bold;"">                                  <a href=""#"" style=""text-decoration:none; color: #000000; margin-bottom:18px;""></a>                              </td>
                              </tr>
                              <tr>
                                 <td style=""padding:20px;text-align:center;font-size:20px;font-weight:bold;                                  background-color:#ffffff;  "">
                                    <p style=""margin:0; ""> ORDER CANCEL REQUEST </a>                                  </p>
                                 </td>
                              </tr>
                              <tr>
                                 <td style=""padding:0;font-size:24px;line-height:28px;font-weight:bold;background-color:#ffffff;"">                                  <a href=""http://www.example.com/"" style=""text-decoration:none;""><img                                          src=""492-4921444_website-cancel-order-hd-png-download.png""width=""150"",height=""150"" alt=""""                                          style=""margin:0px auto;width: 150px;height:auto;display:block;border:none;text-decoration:none;color:#363636;""></a>                              </td>
                              </tr>
                              <td style=""padding:30px;background-color:#ffffff;"">
                                 <h1                                  style=""margin-top:0;margin-bottom:16px;font-size:26px;line-height:50px;font-weight:bold;letter-spacing:-0.02em;"">                                  Dear {Customer},</h1>
                                 <p style=""margin:0; margin-bottom:25px;""> Your request had been sent to our team.We will contact you soon.</p>
                                 <p style=""margin:0; margin-bottom:25px;""> For any other queries contact us at {DOFY contact no}</p>
                                 <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                             </p>
                                 <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                                 
                              </td>
                              </tr>                
                              <tr>
                                 <td style=""padding: 5px 30px 11px 30px;font-size:0;background-color:#ffffff; "">
                                    <!--[if mso]>                  
                                    <table role=""presentation"" width=""100%"">
                                       <tr>
                                          <td style=""width:145px;"" align=""left"" valign=""top"">
                                             <![endif]-->                        <!--[if mso]>                  
                                          </td>
                                          <td style=""width:395px;padding-bottom:20px;"" valign=""top"">
                                             <![endif]-->                      
                                             <div class=""col-lge""                          style=""display:inline-block;width:100%;max-width:395px;vertical-align:top; font-family:Arial,sans-serif;font-size:16px; color:#363636;"">
                                                <p style=""margin-top:0;margin-bottom:0;"">Thank you,</p>
                                                <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                              DOFY TEAM</p>
                                             </div>
                                             <!--[if mso]>                  
                                          </td>
                                       </tr>
                                    </table>
                                    <![endif]-->                  
                                 </td>
                              </tr>
                              <!-- START FOOTER -->              
                              <tr>
                                 <td style=""padding:15px;text-align:center;font-size:12px;background-color:#1b1b1b;color:#cccccc;"">
                                    <p style=""margin:0 0 8px 0;"">                            <a href=""http://www.facebook.com/"" style=""text-decoration:none;"">                              <img src=""https://assets.codepen.io/210284/facebook_1.png"" width=""40"" height=""40"" alt=""f""                                  style=""display:inline-block;color:#cccccc;""></a>                            <a href=""http://www.twitter.com/"" style=""text-decoration:none;"">                              <img src=""https://assets.codepen.io/210284/twitter_1.png"" width=""40"" height=""40"" alt=""t""                                  style=""display:inline-block;color:#cccccc;""></a>                        </p>
                                    <p style=""margin:8px 0 8px 0;font-size:14px;line-height:20px;"">                          DOFY              </p>
                                    <p style=""margin:0;font-size:14px;line-height:20px;"">&reg; Powered by <a class=""unsub""                              href=""https://www.inventsoftlabs.com/home""                              style=""color:hsl(266, 100%, 56%);text-decoration:none;"">Invent SoftLabs (India) Private Limited</a>                      </p>
                                 </td>
                              </tr>
                              <!-- END FOOTER -->            
                           </table>
                           <!--[if mso]>            
                        </td>
                     </tr>
                  </table>
                  <![endif]-->          
               </td>
            </tr>
         </table>
      </div>
   </body>
</html>'
WHERE Id=12;
GO

UPDATE EmailTemplates
SET Template ='<!DOCTYPE html>  
<html lang=""en"" xmlns=""http://www.w3.org/1999/xhtml"" xmlns:o=""urn:schemas-microsoft-com:office:office"">
   <head>
      <meta charset=""utf-8"">
      <meta name=""viewport"" content=""width=device-width,initial-scale=1"">
      <meta name=""x-apple-disable-message-reformatting"">
      <!--[if mso]>    
      <style>      table {border-collapse:collapse;border-spacing:0;border:none;margin:0;}      div, td {padding:0;}      div {margin:0 !important;}    </style>
      <noscript>
         <xml>
            <o:OfficeDocumentSettings>
               <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
         </xml>
      </noscript>
      <![endif]-->        
      <style>          table,          td,          div,          h1,          p {              font-family: Arial, sans-serif;          }            @media screen and (max-width: 530px) {              .unsub {                  display: block;                  padding: 8px;                  margin-top: 14px;                  border-radius: 6px;                  text-decoration: none !important;                  font-weight: bold;              }                .col-lge {                  max-width: 100% !important;              }          }            @media screen and (min-width: 531px) {              .col-sml {                  max-width: 27% !important;              }                .col-lge {                  max-width: 73% !important;              }          }      </style>
   </head>
   <body style=""margin:0;padding:0;word-spacing:normal; background-color: #bbbbbb;"">
      <div role=""article"" aria-roledescription=""email"" lang=""en""          style=""text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;   background-color: #bbbbbb;"">
         <table role=""presentation"" style=""width:100%;border:none;border-spacing:0;"">
            <tr>
               <td align=""center"" style=""padding:0;"">
                  <!--[if mso]>            
                  <table role=""presentation"" align=""center"" style=""width:600px;"">
                     <tr>
                        <td>
                           <![endif]-->                      
                           <table role=""presentation"" style=""width:94%;max-width:600px;border:none;border-spacing:0;text-align:left; padding-top: 50px;                          font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;"">
                              <tr>
                                 <td style=""padding:20px;text-align:center;font-size:20px;font-weight:bold;"">                                  <a href=""#"" style=""text-decoration:none; color: #000000; margin-bottom:18px;"">   </a>                              </td>
                              </tr>
                              <tr>
                                 <td style=""padding:20px;text-align:center;font-size:20px;font-weight:bold;                                  background-color:#ffffff;  "">
                                    <p style=""margin:0; ""> CALL WAS NOT PICKED </a>                                  </p>
                                 </td>
                              </tr>
                              <tr>
                                 <td style=""padding:0;font-size:24px;line-height:28px;font-weight:bold;background-color:#ffffff;"">                                  <a href=""http://www.example.com/"" style=""text-decoration:none;""><img                                          src=""Call not picked.jpeg""width=""150"",height=""150"" alt=""""                                          style=""margin:0px auto; width: 250px;height:auto;display:block;border:none;text-decoration:none;color:#363636;""></a>                              </td>
                              </tr>
                              <td style=""padding:30px;background-color:#ffffff;"">
                                 <h1                                  style=""margin-top:0;margin-bottom:16px;font-size:26px;line-height:50px;font-weight:bold;letter-spacing:-0.02em;"">                                  Dear {Customer},</h1>
                                 <p style=""margin:0; margin-bottom:25px;""> Your Order {Order no} has been failed.</p>
                                 <p style=""margin:0; margin-bottom:25px;""> For any other queries contact us at {DOFY contact no}</p>
                                 <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                             </p>
                                 <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                                 
                              </td>
                              </tr>                
                              <tr>
                                 <td style=""padding: 5px 30px 11px 30px;font-size:0;background-color:#ffffff; "">
                                    <!--[if mso]>                  
                                    <table role=""presentation"" width=""100%"">
                                       <tr>
                                          <td style=""width:145px;"" align=""left"" valign=""top"">
                                             <![endif]-->                        <!--[if mso]>                  
                                          </td>
                                          <td style=""width:395px;padding-bottom:20px;"" valign=""top"">
                                             <![endif]-->                      
                                             <div class=""col-lge""                          style=""display:inline-block;width:100%;max-width:395px;vertical-align:top; font-family:Arial,sans-serif;font-size:16px; color:#363636;"">
                                                <p style=""margin-top:0;margin-bottom:0;"">Thank you,</p>
                                                <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                              DOFY TEAM</p>
                                             </div>
                                             <!--[if mso]>                  
                                          </td>
                                       </tr>
                                    </table>
                                    <![endif]-->                  
                                 </td>
                              </tr>
                              <!-- START FOOTER -->              
                              <tr>
                                 <td style=""padding:15px;text-align:center;font-size:12px;background-color:#1b1b1b;color:#cccccc;"">
                                    <p style=""margin:0 0 8px 0;"">                            <a href=""http://www.facebook.com/"" style=""text-decoration:none;"">                              <img src=""https://assets.codepen.io/210284/facebook_1.png"" width=""40"" height=""40"" alt=""f""                                  style=""display:inline-block;color:#cccccc;""></a>                            <a href=""http://www.twitter.com/"" style=""text-decoration:none;"">                              <img src=""https://assets.codepen.io/210284/twitter_1.png"" width=""40"" height=""40"" alt=""t""                                  style=""display:inline-block;color:#cccccc;""></a>                        </p>
                                    <p style=""margin:8px 0 8px 0;font-size:14px;line-height:20px;"">                          DOFY              </p>
                                    <p style=""margin:0;font-size:14px;line-height:20px;"">&reg; Powered by <a class=""unsub""                              href=""https://www.inventsoftlabs.com/home""                              style=""color:hsl(266, 100%, 56%);text-decoration:none;"">Invent SoftLabs (India) Private Limited</a>                      </p>
                                 </td>
                              </tr>
                              <!-- END FOOTER -->            
                           </table>
                           <!--[if mso]>            
                        </td>
                     </tr>
                  </table>
                  <![endif]-->          
               </td>
            </tr>
         </table>
      </div>
   </body>
</html>'
WHERE Id=13;
GO

UPDATE EmailTemplates
SET Template ='<!DOCTYPE html>  
<html lang=""en"" xmlns=""http://www.w3.org/1999/xhtml"" xmlns:o=""urn:schemas-microsoft-com:office:office"">
   <head>
      <meta charset=""utf-8"">
      <meta name=""viewport"" content=""width=device-width,initial-scale=1"">
      <meta name=""x-apple-disable-message-reformatting"">
      <!--[if mso]>    
      <style>      table {border-collapse:collapse;border-spacing:0;border:none;margin:0;}      div, td {padding:0;}      div {margin:0 !important;}    </style>
      <noscript>
         <xml>
            <o:OfficeDocumentSettings>
               <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
         </xml>
      </noscript>
      <![endif]-->        
      <style>          table,          td,          div,          h1,          p {              font-family: Arial, sans-serif;          }            @media screen and (max-width: 530px) {              .unsub {                  display: block;                  padding: 8px;                  margin-top: 14px;                  border-radius: 6px;                  text-decoration: none !important;                  font-weight: bold;              }                .col-lge {                  max-width: 100% !important;              }          }            @media screen and (min-width: 531px) {              .col-sml {                  max-width: 27% !important;              }                .col-lge {                  max-width: 73% !important;              }          }      </style>
   </head>
   <body style=""margin:0;padding:0;word-spacing:normal; background-color: #bbbbbb;"">
      <div role=""article"" aria-roledescription=""email"" lang=""en""          style=""text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;   background-color: #bbbbbb;"">
         <table role=""presentation"" style=""width:100%;border:none;border-spacing:0;"">
            <tr>
               <td align=""center"" style=""padding:0;"">
                  <!--[if mso]>            
                  <table role=""presentation"" align=""center"" style=""width:600px;"">
                     <tr>
                        <td>
                           <![endif]-->                      
                           <table role=""presentation"" style=""width:94%;max-width:600px;border:none;border-spacing:0;text-align:left; padding-top: 50px;                          font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;"">
                              <tr>
                                 <td style=""padding:20px;text-align:center;font-size:20px;font-weight:bold;"">                                  <a href=""#"" style=""text-decoration:none; color: #000000; margin-bottom:18px;""></a>                              </td>
                              </tr>
                              <tr>
                                 <td style=""padding:20px;text-align:center;font-size:20px;font-weight:bold;                                  background-color:#ffffff;  "">
                                    <p style=""margin:0; ""> CONTACT US </a>                                  </p>
                                 </td>
                              </tr>
                              <tr>
                                 <td style=""padding:0;font-size:24px;line-height:28px;font-weight:bold;background-color:#ffffff;"">                                  <a href=""http://www.example.com/"" style=""text-decoration:none;""><img                                          src=""Contact us image.jpeg""width=""150"",height=""150"" alt=""""                                          style=""margin:0px auto; width:200px;height:auto;display:block;border:none;text-decoration:none;color:#363636;""></a>                              </td>
                              </tr>
                              <td style=""padding:30px;background-color:#ffffff;"">
                                 <h1                                  style=""margin-top:0;margin-bottom:16px;font-size:26px;line-height:50px;font-weight:bold;letter-spacing:-0.02em;"">                                  Dear {Customer},</h1>
                                 <p style=""margin:0; margin-bottom:25px;""> You have requested to give the below information.</p>
                                 <p style=""margin:0; margin-bottom:25px;""> Name:{Name} Phone Number:{Mobile number} Email:{Email} Description:{Description}</p>
                                 <p style=""margin:0; margin-bottom:25px;""> We will revert back you sonn</p>
                                 <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                             </p>
                                 <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                                 
                              </td>
                              </tr>                
                              <tr>
                                 <td style=""padding: 5px 30px 11px 30px;font-size:0;background-color:#ffffff; "">
                                    <!--[if mso]>                  
                                    <table role=""presentation"" width=""100%"">
                                       <tr>
                                          <td style=""width:145px;"" align=""left"" valign=""top"">
                                             <![endif]-->                        <!--[if mso]>                  
                                          </td>
                                          <td style=""width:395px;padding-bottom:20px;"" valign=""top"">
                                             <![endif]-->                      
                                             <div class=""col-lge""                          style=""display:inline-block;width:100%;max-width:395px;vertical-align:top; font-family:Arial,sans-serif;font-size:16px; color:#363636;"">
                                                <p style=""margin-top:0;margin-bottom:0;"">Thank you,</p>
                                                <p style=""margin-top:0; margin-bottom:18px;font-weight:bold;letter-spacing:-0.02em;"">                              DOFY TEAM</p>
                                             </div>
                                             <!--[if mso]>                  
                                          </td>
                                       </tr>
                                    </table>
                                    <![endif]-->                  
                                 </td>
                              </tr>
                              <!-- START FOOTER -->              
                              <tr>
                                 <td style=""padding:15px;text-align:center;font-size:12px;background-color:#1b1b1b;color:#cccccc;"">
                                    <p style=""margin:0 0 8px 0;"">                            <a href=""http://www.facebook.com/"" style=""text-decoration:none;"">                              <img src=""https://assets.codepen.io/210284/facebook_1.png"" width=""40"" height=""40"" alt=""f""                                  style=""display:inline-block;color:#cccccc;""></a>                            <a href=""http://www.twitter.com/"" style=""text-decoration:none;"">                              <img src=""https://assets.codepen.io/210284/twitter_1.png"" width=""40"" height=""40"" alt=""t""                                  style=""display:inline-block;color:#cccccc;""></a>                        </p>
                                    <p style=""margin:8px 0 8px 0;font-size:14px;line-height:20px;"">                          DOFY              </p>
                                    <p style=""margin:0;font-size:14px;line-height:20px;"">&reg; Powered by <a class=""unsub""                              href=""https://www.inventsoftlabs.com/home""                              style=""color:hsl(266, 100%, 56%);text-decoration:none;"">Invent SoftLabs (India) Private Limited</a>                      </p>
                                 </td>
                              </tr>
                              <!-- END FOOTER -->            
                           </table>
                           <!--[if mso]>            
                        </td>
                     </tr>
                  </table>
                  <![endif]-->          
               </td>
            </tr>
         </table>
      </div>
   </body>
</html>'
WHERE Id=14;
GO

Create PROCEDURE [dbo].[GetAssigneeDetails]    
	@PersonId bigint = null
AS
    BEGIN

			Declare @inPersonId bigint = @PersonId;
			Declare @RiderRoleId bigint = (Select Top 1 Id from Roles where EnumName = 'Rider');

			Declare @Status Table
			(
				Id bigint,
				EnumName varchar(200)
			)

			Insert into @Status
			Select Id, EnumName 
				From Status where EnumName not in ('Cancelled')
            
          	Select pl.Id
			  , LoginId
			  , UserRoleId
			  , FullName AssigneeName			  
			  , Email		  
			  , Mobile
			  , SecondaryMobile
			  , UploadImagePath
			  , UploadImageName
			  , 5 as UserRating
			  , ual.Address
			  , ual.PinCode
			  , ual.CityId
			  , (Select Count(od.Id) From vw_OrdersList od
						Inner join vw_AppointmentList al on al.OrderId = od.Id 
						Where AssigneeId = pl.Id 
						and od.StatusId in (Select Id from @Status)) as AppointmentCount
		From vw_PersonList pl
			Inner Join vw_UserRolesList ur on ur.Id  = pl.UserRoleId
			Inner Join vw_RolesList rl on rl.Id = ur.RoleId
			Inner join vw_AppointmentList apl on apl.AssigneeId = pl.Id
			Inner join vw_UserAddressList ual on ual.PersonId = pl.Id
		Where ual.IsDefault = 1
		and rl.Id = @RiderRoleId
		and (@inPersonId is null or pl.Id = @inPersonId)
             
End
GO

ALTER PROCEDURE [dbo].[GetOrderSummary]
    @OrderId bigint   
AS
    BEGIN

	Declare @QuestionaireVersion bigint = (Select Max(Version) From vw_QuestionnaireResponsesList where OrderId = @OrderId);

	--Order data
	Select 
                     od.Id,
                     od.PersonId,
                     od.ServiceTypeId,
					 sr.DisplayName as ServiceType,
                     od.ModelVariantId,
					 mv.DisplayName as ModelVariantName,
					 mv.ThumbnailPath,
					 od.OrderCode,
					 mv.ProductTypeName,
					 mv.BrandMasterName,
					 mv.SeriesModelName,
					 pl.FullName as UserName,
					 pl.Mobile as UserMobile,
					 pl.SecondaryMobile,									                
                     od.StatusId,
					 od.SuggestedCost,
					 od.FinalPaid,
					 sl.DisplayName as StatusName,
					 mv.ThumbnailPath
                 From vw_OrdersList od
					 Inner Join vw_ModelVariant mv on mv.Id = od.ModelVariantId
					 Inner Join vw_ServiceTypeList sr on sr.Id = od.ServiceTypeId				 
					 Inner join vw_PersonList pl on pl.Id = od.PersonId
					 Inner Join vw_StatusList sl on sl.Id = od.StatusId
				 Where od.Id = @OrderId

	--Appointment Data
	--To do --Add address in this table
			Select 
				apl.Id
				, OrderId
				, AssigneeId
				, AppointmentDate
				, StartTime
				, EndTime
				, Remarks
				, TechnicianComments
				, apl.RowOrder
				, IsReschedule
				, apl.Active
				, ua.Address
				, ua.City as AppointmentCity 
				, ua.PinCode as AppointmentPincode 
			From vw_AppointmentList apl
			Left Outer Join vw_UserAddressList ua on ua.Id = apl.UserAddresId
			Where apl.OrderId = @OrderId

	-- Assingee details
		Select pl.Id
			  , LoginId
			  , UserRoleId
			  , FullName AssigneeName			  
			  , Email		  
			  , Mobile
			  , SecondaryMobile
			  , UploadImagePath
			  , UploadImageName
			  , 5 as UserRating
			  , ual.Address
			  , ual.PinCode
			  , ual.CityId
		From vw_PersonList pl
			Inner join vw_AppointmentList apl on apl.AssigneeId = pl.Id
			Inner join vw_UserAddressList ual on ual.PersonId = pl.Id
		Where apl.OrderId = @OrderId and ual.IsDefault = 1

		-- Order Documents

		Select 
				odl.Id
				, OrdersId
				, DocumentTypeId
				, DocumentPath
				, odl.RowOrder
				, odl.Active
				, dyl.DisplayName as DocumentTypeName
		From vw_OrderDocumentsList odl
			Inner join vw_DocumentTypeList dyl on dyl.Id = odl.DocumentTypeId
		Where odl.OrdersId = @OrderId

		-- Questionaire Response

		Select qrl.Id
			  , OrderId
			  , QuestionnaireTemplateId
			  , qrl.Selected
			  , qrl.Threshold
			  , qrl.RowOrder
			  , qrl.Version
			  , qrl.Active
			  , qt.DisplayName as Question
			  , qt.AnswerType
			  , qt.ThumbnailPath
			  , qt.Type as QuestionType
			  , qt.QuestionnaireTypeId
			  , qtl.DisplayName as QuestionaireType
			  , qt.ParentId
		From vw_QuestionnaireResponsesList qrl
			Inner Join vw_QuestionnaireTemplateList qt on qt.Id = qrl.QuestionnaireTemplateId
			Inner Join vw_QuestionnaireTypeList qtl on qtl.Id = qt.QuestionnaireTypeId
		Where qrl.OrderId = @OrderId and qrl.Version = @QuestionaireVersion


		-- Repair Orders

		Select opl.Id
			  , OrderId
			  , opl.RepairTypeId
			  , PartTypeId
			  , opl.RowOrder
			  , opl.Active
			  , rt.DisplayName as RepairType
			  , pt.PartName as PartType
		From vw_OrderPartsList opl
			Inner Join vw_RepairTypeList rt on rt.Id = opl.RepairTypeId
			Inner Join vw_PartTypeList pt on pt.Id = opl.PartTypeId
		Where opl.OrderId = @OrderId


End
GO

Create PROCEDURE [dbo].[GetUsersByRoleId]    
	@RoleId bigint = null
AS
    BEGIN
			Declare @inRoleId bigint = @RoleId;
			            
          	Select pl.Id
			  , LoginId
			  , rl.Id as RoleId
			  , UserRoleId
			  , FirstName
			  , LastName
			  , MiddleName
			  , DateOfBirth
			  , Email		  
			  , Mobile
			  , SecondaryMobile
			  , UploadImagePath
			  , UploadImageName
			  , rl.Name as UserRoleName
		From vw_PersonList pl
			Inner Join vw_UserRolesList ur on ur.Id  = pl.UserRoleId
			Inner Join vw_RolesList rl on rl.Id = ur.RoleId			
		Where @inRoleId is null or rl.Id = @inRoleId
             
End
GO

ALTER View [dbo].[vw_StatusList]

AS
       Select 
          Id,
          EntityType,
          Name,
          Description,
          DisplayName,
          EnumName,
          TemplateText,
          DisplayInList,
          ExternalStatus,
		  ColorCode,
          Active,
          RowOrder,
          Created,
          CreatedBy,
          Modified,
          ModifiedBy
        From STATUS (NoLock) 
        Where Active = 1 

GO

ALTER PROCEDURE [dbo].[GetOrdersList]
    @WhereClause varchar(200),
    @SortOrder varchar(100),
    @OffsetStart int,
    @RowsPerPage int,
	@StatusId varchar(100) = null,
	@ProductTypeId bigint = null
AS
    BEGIN

                Declare @inSortOrder varchar(50) = @SortOrder;
                Declare @inWhereClause varchar(50) = @WhereClause;
                Declare @inOffsetStart int = @OffsetStart;
                Declare @inRowsPerPage int = @RowsPerPage;
                Declare @SortColumn varchar(50);
                Declare @Direction varchar(4);

				Declare @Status Table
				(
					Id bigint
				)

				if @StatusId is not null
					Begin
						Insert into @Status 
						Select Item from dbo.fn_SplitIds (@StatusId,',')
					End
					Else
					Begin
						Insert Into @Status
						Select Id From vw_StatusList where EntityType = 'Orders' and EnumName != 'PENDING'
					End

                Select @inOffsetStart = OffsetStart, @inRowsPerPage = RowsPerPage, @SortColumn = SortColumn, @Direction = Direction, @inWhereClause = WhereClause From 
                                    [dbo].[fn_GetSPDefaults] (@inOffsetStart, @inRowsPerPage, @inSortOrder, @inWhereClause);

                Select 
                     od.Id,
                     od.PersonId,
                     od.ServiceTypeId,
					 od.SeriesModelId,
					 sr.DisplayName as ServiceType,
                     od.ModelVariantId,
					 mv.DisplayName as ModelVariantName,
					 mv.ThumbnailPath,
					 od.OrderCode,
					 mv.ProductTypeName,
					 mv.BrandMasterName,
					 IsNull(mv.SeriesModelName, sm.DisplayName) as SeriesModelName,
					 pl.FullName as UserName,
					 pl.Mobile as UserMobile,
					 apl.AppointmentDate,
					 apl.StartTime,
					 ua.City as AppointmentCity, 
					 ua.PinCode as AppointmentPincode,                     
                     od.StatusId,
					 apl.AssigneeId,
					 asg.FirstName + ' ' + asg.LastName as AssigneeName, 
					 sl.DisplayName as StatusName,
					 sl.ColorCode,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_OrdersList od
				 Left outer Join vw_ModelVariant mv on mv.Id = od.ModelVariantId
				 Left outer join vw_SeriesModel sm on sm.Id = od.SeriesModelId
				 Inner Join vw_ServiceTypeList sr on sr.Id = od.ServiceTypeId				 
				 Inner Join vw_PersonList pl on pl.Id = od.PersonId
				 Inner Join vw_StatusList sl on sl.Id = od.StatusId
				 Left Outer Join vw_AppointmentList apl on apl.OrderId = od.Id
				 Left Outer join vw_PersonList asg on asg.Id =apl.AssigneeId
				 Left Outer Join vw_UserAddressList ua on ua.Id = apl.UserAddresId
                Where (od.StatusId in (Select Id from @Status))
				and (@ProductTypeId is null or mv.ProductTypeId = @ProductTypeId)
				And (@inWhereClause Is Null
                        Or (OrderCode LIKE @inWhereClause
							or mv.BrandMasterName Like @inWhereClause
							or mv.SeriesModelName Like @inWhereClause
							or pl.Mobile Like @inWhereClause
							or pl.FirstName Like @inWhereClause
							or pl.LastName Like @inWhereClause
                        )
                     )
                ORDER BY
                CASE WHEN @Direction = 'ASC' Then
                    CASE @SortColumn
                        WHEN 'ORDERCODE' THEN OrderCode
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), od.Modified, 120)
                    ELSE NULL
                    End
                End ASC,
                CASE WHEN @Direction = 'DESC' Then
                    CASE @SortColumn
                        WHEN 'ORDERCODE' THEN OrderCode                       
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), od.Modified, 120)
                    ELSE NULL
                    End
                End DESC
                OFFSET @OffsetStart ROWS 
                FETCH NEXT @RowsPerPage ROWS ONLY
End
GO

Create PROCEDURE GetOrderStats
	@PersonId bigint = null
AS
BEGIN
	
	SET NOCOUNT ON;

	Declare @Status Table
	(
		Id bigint,
		EnumName varchar(100)
	)

	Insert into @Status
	Select Id, EnumName 
	From vw_StatusList Where EntityType = 'ORDERS' and EnumName != 'PENDING';

	
SELECT 
	(SELECT COUNT(StatusId) FROM [vw_OrdersList]	
	WHERE StatusId in(Select Id from @Status)) AS [All],

	(SELECT COUNT(StatusId) FROM [vw_OrdersList]	
	WHERE StatusId in (Select Id From @Status where EnumName in ('SCHEDULED', 'RESCHEDULED'))) AS [Open] ,

	(SELECT COUNT(StatusId) FROM [vw_OrdersList]
	WHERE StatusId in (Select Id From @Status where EnumName in ('INPROGRESS','ASSIGNED','REQUOTE','DELAYED'))) AS [Inprogress] ,

	(SELECT COUNT(StatusId) FROM [vw_OrdersList]
	WHERE StatusId in (Select Id From @Status where EnumName in ('COMPLETED')))  AS Completed,

	(SELECT COUNT(StatusId) FROM [vw_OrdersList]
	WHERE StatusId in (Select Id From @Status where EnumName in ('FAILED'))) AS Failed,

	(SELECT COUNT(StatusId) AS CANCELLED  FROM [vw_OrdersList]
	WHERE StatusId in (Select Id From @Status where EnumName in ('CANCELLED','CANCEL_REQUEST'))) AS Cancelled

OPTION (RECOMPILE);
   
END
GO

