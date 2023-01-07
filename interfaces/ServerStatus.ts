export interface SrvA {
    name: string;
    type: string;
    class: string;
    ttl: number;
    rdlength: number;
    rdata: string;
    address: string;
}

export interface Srv {
    name: string;
    type: string;
    class: string;
    ttl: number;
    rdlength: number;
    rdata: string;
    priority: number;
    weight: number;
    port: number;
    target: string;
}

export interface Dns {
    srv_a: SrvA[];
    srv: Srv[];
}

export interface Error {
    query: string;
}

export interface Debug {
    ping: boolean;
    query: boolean;
    srv: boolean;
    querymismatch: boolean;
    ipinsrv: boolean;
    cnameinsrv: boolean;
    animatedmotd: boolean;
    cachetime: number;
    cacheexpire: number;
    apiversion: number;
    dns: Dns;
    error: Error;
}

export interface Motd {
    raw: string[];
    clean: string[];
    html: string[];
}

export interface Players {
    online: number;
    max: number;
    list: string[];
    uuid: { [key: string]: string; }
}

export interface ServerStatus {
    ip: string;
    port: number;
    debug: Debug;
    motd: Motd;
    players: Players;
    version: string;
    online: boolean;
    protocol: number;
    icon?: string;
    hostname: string;
    software?: string;
    serverId?: string;
    gamemode?: string;
    map?: string;
    plugins?: { [key: string]: string[]; }
    mods?: { [key: string]: string[]; }
    info?: { [key: string]: string[]; }
}

