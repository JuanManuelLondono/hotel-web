import { Service } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { HotelInfo } from '../../models/hotel-info';
import { Room } from '../../models/room';

interface HotelJson {
    info: HotelInfo;
    rooms: Room[];
}

@Service()
export class HotelData {
    // httpResource pide el JSON y expone un signal con el resultado
    private resource = httpResource<HotelJson>(() => './data/hotel-data.json');

    // signals derivados
    info = () => this.resource.value()?.info;
    rooms = () => this.resource.value()?.rooms ?? [];
    isLoading = this.resource.isLoading;
}
