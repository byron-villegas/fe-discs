export function formatFirstLetterUpperCase(value: string) {
    if (value == null || value == undefined) { 
        return '';
    }

    let text = '';
    const textSplit = value.split(' ');
    for (let i = 0; textSplit.length > i; i++) {
        if (i == 0)
            text = textSplit[i].substring(0, 1).toUpperCase() + textSplit[i].substring(1).toLowerCase();
        if (i != 0)
            text = text + ' ' + textSplit[i].substring(0, 1).toUpperCase()
                + textSplit[i].substring(1).toLowerCase();
    }
    return text;
}

export function getTitleCategoryNameByName(name: string) {
    if (name == null || name == undefined) { 
        return '';
    }

    switch (name.toUpperCase()) {
        case 'VINYLS':
            return 'Vinilos';
        case 'CDS':
            return 'CDs';
        case 'CASSETTES':
            return 'Cassettes';
        default:
            return '';
    }
}