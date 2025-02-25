import { BaseGuild } from '@core/interfaces';
import { CharacterSummary } from '.';


export interface Members extends BaseGuild {
    members: Member[];
}

export interface Member {
    rank: number;
    character: CharacterSummary;
}
