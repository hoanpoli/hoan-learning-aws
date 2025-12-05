export interface SingpassAuthDataResponse {
    authorizationUrl: string;
    code_verifier: string;
    nonce: string;
    state: string;
}

export interface SingpassPersonBodyData {
    code_verifier?: string | null;
    nonce?: string | null;
    state?: string | null;
    paramCode?: string | null;
    paramState?: string | null;
}

interface Data {
    value: string
}

export interface SingpassPersonResponse {
    email: Data,
    name: Data,
    regadd: {
        postal: Data, 
        street: Data,
        unit: Data,
        black: Data,
        floor: Data,
        building: Data
    },
    uinfin: Data
}