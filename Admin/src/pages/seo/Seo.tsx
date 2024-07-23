import { IonButton, IonCard, IonCheckbox, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonText, IonTextarea } from '@ionic/react'
import { arrowBackOutline, checkboxOutline } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import { isRider } from '../../components/helper/TokenHelper'
import { CustomInput } from '../../components/shared/CustomInput'
import { ISeoModel } from '../../models/Seo.Model'
import SeoServices from '../../services/Seo.Services'
import "./Seo.css"

function Seo() {
  const { id } = useParams<{ id: any }>();
  const [seo, setSeo] = useState<ISeoModel>({} as ISeoModel);
  const [SeoList, setSeoList] = useState<Array<ISeoModel>>([]);
  const isAddMode = !id;

  const { register, handleSubmit, clearErrors, formState: { errors }, reset } = useForm<ISeoModel>();
  const riderlogin: boolean = isRider() ?? false;

  const onSubmit: SubmitHandler<ISeoModel> = (data) => {
    return isAddMode ? createSeo(data) : editSeo(data);
  };

  function createSeo(data: ISeoModel) {
    SeoServices.Create(data).then((res: any) => {
      if (res.status === 200) {
        window.location.href = "/SeoDashboard";
        alert("Created successfully");
      }
    }).catch((e: string) => {
      console.log(e);
    });
  }

  function editSeo(data: ISeoModel) {
    SeoServices.Edit(data).then((res: any) => {
      if (res.status === 200) {
        window.location.href = "/SeoDashboard";
        alert("Successfully Update");
      }
    }).catch((e: string) => {
      console.log(e);
    });
  }

  const Cancel = () => {
    window.location.href = "/SeoDashboard";
  }

  useEffect(() => {
    const GetSeoDetail = (id: number) => {
      if (!isAddMode) {
        SeoServices.EditSEO(id).then(user => {
          reset(user.data)
          setSeo(user.data);
        });
      }
    }

    GetSeoDetail(id);
  }, [id, isAddMode, reset]);
  return (
    <IonPage>
      <IonContent>
        <IonGrid >
          <br /><br />
          <IonRow>
            <IonCol>
              <form onSubmit={handleSubmit(onSubmit)}>
                <IonRow>
                  <IonCol>
                    <IonCard>
                      <IonRow>
                        <IonCol sizeLg='6' sizeMd='6' sizeXl='6' sizeSm='6' sizeXs='6' >
                          <CustomInput label={"Page Name *"} placeholder="Page Name" disabled {...register("PageName", { required: true })} onIonChange={() => { clearErrors("PageName"); }} />
                          {errors.PageName && (<IonText color='danger' className="error-padding">Please enter Page Name</IonText>)}
                        </IonCol>
                        <IonCol sizeLg='6' sizeMd='6' sizeXl='6' sizeSm='6' sizeXs='6'>
                          <CustomInput label={"Title *"} placeholder="Title" {...register("Title", { required: true })} onIonChange={() => { clearErrors("Title"); }} />
                          {errors.Title && (<IonText color='danger' className="error-padding">Please enter Title</IonText>)}
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol sizeLg='6' sizeMd='6' sizeXl='6' sizeSm='6' sizeXs='6'>
                          <IonItem>
                            <IonLabel position="floating">Keywords </IonLabel>
                            <IonTextarea {...register('Keywords')} />
                          </IonItem>
                        </IonCol>
                        <IonCol sizeLg='6' sizeMd='6' sizeXl='6' sizeSm='6' sizeXs='6'>
                          <IonItem>
                            <IonLabel position='floating'>Description</IonLabel>
                            <IonTextarea {...register('Description')} />
                          </IonItem>
                        </IonCol>
                      </IonRow>
                    </IonCard>
                    <IonCard>
                    <IonRow>
                        <IonCol sizeLg='12' sizeMd='12' sizeXl='12' sizeSm='12' sizeXs='12'>
                          <IonItem>
                            <IonLabel position='floating'>Seo Content Title</IonLabel>
                            <IonTextarea {...register('SeocontentTitle')} />
                          </IonItem>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol sizeLg='12' sizeMd='12' sizeXl='12' sizeSm='12' sizeXs='12'>
                          <IonItem>
                            <IonLabel position='floating'>Seo Content</IonLabel>
                            <IonTextarea className='seo-text-area' {...register('SeoContent')} />
                          </IonItem>
                        </IonCol>
                      </IonRow>
                    </IonCard>
                  </IonCol>
                </IonRow>
                <IonRow >
                  <IonCol>
                    <IonCard>
                      <IonRow>
                        <IonCol sizeLg='6' sizeMd='6' sizeXl='6' sizeSm='6' sizeXs='6'>
                          <CustomInput label={"OG Type"} placeholder="OG Type"{...register("OGType")} />
                        </IonCol>
                        <IonCol sizeLg='6' sizeMd='6' sizeXl='6' sizeSm='6' sizeXs='6'>
                          <CustomInput label={"OG Url"} placeholder="OG Url" {...register("OGUrl")} />
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol sizeLg='6' sizeMd='6' sizeXl='6' sizeSm='6' sizeXs='6'>
                          <CustomInput label={"OG Title"} placeholder="OG Title" {...register("OGTitle")} />
                        </IonCol>
                        <IonCol sizeLg='6' sizeMd='6' sizeXl='6' sizeSm='6' sizeXs='6'>
                          <CustomInput label={"OG Image"} placeholder="OG Image" {...register("OGImage")} />
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol sizeLg='12' sizeMd='12' sizeXl='12' sizeSm='12' sizeXs='12'>
                          <IonItem>
                            <IonLabel position='floating'>OG Description</IonLabel>
                            <IonTextarea {...register('OGDescription')} />
                          </IonItem>
                        </IonCol>
                      </IonRow>
                    </IonCard>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonCard>
                      <IonRow>
                        <IonCol sizeLg='6' sizeMd='6' sizeXl='6' sizeSm='6' sizeXs='6'>
                          <CustomInput label={"Twitter Card"} placeholder="Twitter Card" {...register("TwitterCard")} />
                        </IonCol>
                        <IonCol sizeLg='6' sizeMd='6' sizeXl='6' sizeSm='6' sizeXs='6'>
                          <CustomInput label={"Twitter Site"} placeholder="Twitter Site" {...register("TwitterSite")} />
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol sizeLg='6' sizeMd='6' sizeXl='6' sizeSm='6' sizeXs='6'>
                          <CustomInput label={"Twitter Title"} placeholder="Twitter Title" {...register("TwitterTitle")} />
                        </IonCol>
                        <IonCol sizeLg='6' sizeMd='6' sizeXl='6' sizeSm='6' sizeXs='6'>
                          <CustomInput label={"Twitter Image"} placeholder="Twitter Image" {...register("TwitterImage")} />
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol sizeLg='12' sizeMd='12' sizeXl='12' sizeSm='12' sizeXs='12'>
                          <IonItem>
                            <IonLabel position='floating'>Twitter Description</IonLabel>
                            <IonTextarea {...register('TwitterDescription')} />
                          </IonItem>
                        </IonCol>
                      </IonRow>
                      {/* <IonRow>
                        <IonCol>
                          <IonCheckbox ></IonCheckbox>
                          <IonLabel className='si_space'>Active</IonLabel>
                        </IonCol>
                      </IonRow> */}
                      <IonRow >
                        <IonCol className='si_button'>
                          <IonButton size="small" color="danger" onClick={() => Cancel()}>
                            <IonIcon icon={arrowBackOutline}></IonIcon>
                            Cancel
                          </IonButton>&nbsp;
                          {isAddMode ? <IonButton size="small" color="success" type="submit"><IonIcon icon={checkboxOutline}></IonIcon>
                            Submit
                          </IonButton>
                            :
                            <IonButton size="small" color="success" type="submit">Update</IonButton>
                          }
                        </IonCol>
                      </IonRow>
                    </IonCard>
                  </IonCol>
                </IonRow>
              </form>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default Seo;