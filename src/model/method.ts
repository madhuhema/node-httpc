export enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export function getMethodArray() {
    return [
        Method.GET.toString().toLowerCase(),
        Method.POST.toString().toLowerCase(),
        Method.PUT.toString().toLowerCase(),
        Method.DELETE.toString().toLowerCase()
    ];
}


export function getMethodByName(name: string) {
    name = name.toUpperCase();
    let typedColorString = name as keyof typeof Method;
    return Method[typedColorString];
}