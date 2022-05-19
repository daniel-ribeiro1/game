import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { GameComponent } from "./game.component";
import { ActionsComponent } from "./views/actions/actions.component";
import { NamesComponent } from "./views/names/names.component";
import { PlacesComponent } from "./views/places/places.component";
import { ResultComponent } from "./views/result/result.component";

const routes: Routes = [
    {
        path: '',
        component: GameComponent,
        children: [
            {
                path: 'names',
                component: NamesComponent
            },
            {
                path: 'actions',
                component: ActionsComponent
            },
            {
                path: 'places',
                component: PlacesComponent
            },
            {
                path: 'result',
                component: ResultComponent
            },
            {
                path: '',
                redirectTo: 'names'
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class GameRoutingModule {}