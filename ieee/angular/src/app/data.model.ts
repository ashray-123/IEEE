export class dataMod{
    public url!: string;
    public keywords!:string[];
    public title!:string;
    public datetime!: string;
    public positive!: number;
    public negative!: number;  
    public neutral!: number;  
    public subjectivity!: number;
}

export class companyMod{
    public symbol!:string;
    public company_name!:string;
    public market_cap!:string;
}

export class dashboardData{
    public title!:string;
    public datetime!: string;
    public positive!: number;
    public negative!: number;  
    public neutral!: number;  
    public subjectivity!: number;
    public market_cap!:number;
    public symbol!:string;
    public company_name!:string;
    public keywords!:string[];
}