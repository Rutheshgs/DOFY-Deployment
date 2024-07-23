Update QuestionnaireTemplate set ParentId = 1, ThresholdLevel= 1 where ParentId = 2;
GO

Delete from QuestionnaireTemplate where Identifier = 2;
GO

ALTER PROCEDURE [dbo].[GetQuote]
    @OrderId bigint	
AS
    BEGIN

		Declare @productMinimumValue Float;
		Declare @productMaximumValue Float;
		Declare @FinalValue Float;
		Declare @RequoteStatusId bigint;
		Declare @OrderStatusId bigint;

		Declare @QuoteThreshold Table
		(
			QuestionnaireTypeId Float,
			RowOrder int,
			ProductMinimumValue Float,
			ProductMaximumValue Float,
			SelectedThreshold Float,
			MaximumThreshold Float,
			ProductDiminishedValue Float,
			FinalValue Float
		)

		Select Top 1 @RequoteStatusId = Id From Status s where s.EnumName = 'ReQuote' and EntityType = 'Orders';

		Select @productMinimumValue = mv.MinimumValue, 
				@productMaximumValue = mv.MaximumValue,
				@OrderStatusId = o.StatusId
		From  Orders (nolock) o 
			Inner Join ModelVariant (nolock) mv on mv.Id = o.ModelVariantId
		Where o.Id = @OrderId;

		Insert Into @QuoteThreshold
		Select qtp.QuestionnaireTypeId, qtp.RowOrder, @productMinimumValue, @productMaximumValue, Sum(qr.Threshold), Max(qtp.Threshold), 0, 0
		FROM QuestionnaireResponses (nolock) qr
			Inner Join vw_QuestionnaireTemplates (nolock) qt on qt.Id = qr.QuestionnaireTemplateId		
			Inner Join vw_QuestionnaireTemplates (nolock) qtp on 
				qtp.ProductTypeId = qt.ProductTypeId
				and qt.QuestionnaireTypeId = qtp.QuestionnaireTypeId 
				-- and qtp.Identifier = qt.ParentId	
				and qtp.ThresholdLevel = 1
		Where qr.OrderId = @orderId
			And qr.Selected = 1
		Group by qtp.QuestionnaireTypeId, qtp.RowOrder
		Order by qtp.QuestionnaireTypeId, qtp.RowOrder;
		
		Update @QuoteThreshold 
			Set ProductDiminishedValue = Case When MaximumThreshold < SelectedThreshold Then (ProductMaximumValue * MaximumThreshold)/100
								Else (ProductMaximumValue * SelectedThreshold)/100 End;

		Update @QuoteThreshold Set FinalValue = ProductMaximumValue - (Select Sum(ProductDiminishedValue) From @QuoteThreshold);

		Set @FinalValue = (Select Top 1 FinalValue from @QuoteThreshold Order By RowOrder DESC);

		If @OrderStatusId = @RequoteStatusId
			Begin
				Update Orders set RequoteAmount = @FinalValue where Id = @OrderId;
			End
		Else
			Begin
				Update Orders set SuggestedCost = @FinalValue where Id = @OrderId;
			End;

		Select @FinalValue as FinalValue;

End
GO

ALTER TABLE [dbo].[OrderDocuments] DROP CONSTRAINT PK__OrderDoc__3214EC0726343E94;
GO

DROP INDEX IX_OrderDocuments on [dbo].[OrderDocuments];
GO

ALTER TABLE [dbo].[OrderDocuments] DROP COLUMN Id;
GO

ALTER TABLE [dbo].[OrderDocuments] ADD Id BIGINT PRIMARY KEY Identity(1,1) NOT NULL;
GO

CREATE INDEX IX_OrderDocuments ON [dbo].[OrderDocuments] ([Id],[OrdersId],[DocumentTypeId],[Active]);
GO

Insert into EmailTemplates(TemplateName,DisplayName,Template,EmailSubject,EmailCC,EmailBCC,SenderEmail,RowOrder,Active)
  values('Contact Us','Contact Us',
  '<p>Dear {CustomerName},<br /> 
< i>You have Request for below the information</i><br />
Name: {Name}<br />
Phone Number:{MobilePhone}<br />
Email:{Email}<br />
Description:{Description}<br />
<i> We Will Revert back you soon.</i><br />
 Thanks,
<br />
<b>DOFYU Team</b> 
<br /> </p>','Contact Us','indhumathiv@gmail.com','indhumathiv@gmail.com','jmaha0910@gmail.com',10,1)
GO

Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_audiojack.webp' Where Identifier = '28';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_audioreceiver.webp' Where Identifier = '22';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_backcamera.webp' Where Identifier = '12';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_battery.webp' Where Identifier = '16';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_bluetooth.webp' Where Identifier = '24';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_backcameraglass.webp' Where Identifier = '23';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_chargeport.webp' Where Identifier = '19';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_fingerprint.webp' Where Identifier = '14';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_frontcamera.webp' Where Identifier = '11';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_mic.webp' Where Identifier = '26';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_powerbutton.webp' Where Identifier = '18';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_proximity.webp' Where Identifier = '27';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_silent.webp' Where Identifier = '21';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_speaker.webp' Where Identifier = '17';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_vibration.webp' Where Identifier = '25';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_volumebutton.webp' Where Identifier = '13';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_wifi.webp' Where Identifier = '15';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_PhoneBox.webp' Where Identifier = '33';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_charger.webp' Where Identifier = '31';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_headphone.webp' Where Identifier = '32';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_bill.webp' Where Identifier = '34';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_frontcamera.webp' Where Identifier = '20';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_1scratches.webp' Where Identifier = '57';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_1spot.webp' Where Identifier = '41';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_2morescratches.webp' Where Identifier = '56';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_3spot.webp' Where Identifier = '39';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_chippedcracked.webp' Where Identifier = '49';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_displayfaded.webp' Where Identifier = '44';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_largespot.webp' Where Identifier = '39';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_noline.webp' Where Identifier = '46';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_Noscratche.webp' Where Identifier = '58';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_Nospot.webp' Where Identifier = '42';
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_screencracked.webp' Where Identifier = '48';
GO

Update RepairType set Thumbnailpath = 'repair_audiojack.webp' where id = '9';
Update RepairType set Thumbnailpath = 'repair_battery.webp' where id = '2';
Update RepairType set Thumbnailpath = 'repair_chargeport.webp' where id = '5';
Update RepairType set Thumbnailpath = 'repair_frontspeaker.webp' where id = '4';
Update RepairType set Thumbnailpath = 'repair_mic.webp' where id = '3';
Update RepairType set Thumbnailpath = 'repair_panelbreak.webp' where id = '7';
Update RepairType set Thumbnailpath = 'repair_proximity.webp' where id = '8';
Update RepairType set Thumbnailpath = 'repair_screendamage.webp' where id = '1';
Update RepairType set Thumbnailpath = 'repair_speaker.webp' where id = '6';
GO