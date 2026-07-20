import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { RoomList } from './features/rooms/room-list/room-list';
import { RoomDetail } from './features/rooms/room-detail/room-detail';

export const routes: Routes = [
    { path: '', component: Home },
    {
        path: 'habitaciones',
        component: RoomList,
        children: [
            { path: ':id', component: RoomDetail, outlet: 'modal' }
        ]
    }
];
