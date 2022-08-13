export class Selections{
    selectionId: number;
	selectionName: string;
	minimumSelection: number;
	maximumSelection: number;
	businessId: number;
	isDeleted: boolean;
	active: boolean;
    selectionChoices:Array<SelectionChoices>
}

export class SelectionChoices{
    choicesId: number;
    selectionId: number;
    choiceName: string;
    choicePrice: number;
    choiceSortedBy: number;
    businessId: number;
    isDeleted: boolean;
    active: boolean
}