import AddressFormIN from '../formIN/AddressFormIN';
import { IAddressModel } from '@/models/Address.Model';
import AddressFormAE from '../formAE/AddressFormAE';
import { Direction, getUserLanguage, isIn } from '../../helper/Helper';
import './AddressForm.css';
import Language from './AddressFormLanguage.json'

type Props = {
  defaultValues: IAddressModel,
  isEdit: boolean,
  isAddress: boolean,
  pageFrom?: "ScheduleAddress" | "other"
  setDefaultShow?: any,
  setChangesInAddress?: any
}

function AddressForm({ defaultValues, isEdit, isAddress, pageFrom, setDefaultShow, setChangesInAddress }: Props) {
  let dataLocalization = Language[getUserLanguage()];

  return (
    <ion-grid>
      <ion-row >
      <ion-col class='os-choose-col' size='12'>
          <ion-text>{dataLocalization.Kindly_help_us_with}</ion-text>
        </ion-col>
        <ion-col size='12'>
          <ion-card class="address-edit" dir={Direction()}>
            {isIn() ?
              <AddressFormIN defaultValues={defaultValues} isEdit={isEdit} isAddress={isAddress} pageFrom={pageFrom} setDefaultShow={setDefaultShow} setChangesInAddress={setChangesInAddress} />
              :
              <AddressFormAE defaultValues={defaultValues} isEdit={isEdit} isAddress={isAddress} pageFrom={pageFrom} setDefaultShow={setDefaultShow} setChangesInAddress={setChangesInAddress} />
            }
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>
  )
}

export default AddressForm