import { CareerMetadata } from '../types/career';

export class CareerMetadataService {
    private static instance: CareerMetadataService;
    private metadata: CareerMetadata;

    private constructor() {
        this.metadata = require('../data/career_metadata.json');
    }

    public static getInstance(): CareerMetadataService {
        if (!CareerMetadataService.instance) {
            CareerMetadataService.instance = new CareerMetadataService();
        }
        return CareerMetadataService.instance;
    }

    public getCareerDetails(careerName: string) {
        return this.metadata.careers[careerName];
    }

    public getAllCareers() {
        return Object.keys(this.metadata.careers);
    }

    public getEducationalRequirements(careerName: string) {
        return this.metadata.careers[careerName]?.educational_requirements;
    }

    public getCareerDescription(careerName: string) {
        return this.metadata.careers[careerName]?.description;
    }

    public getSkills(careerName: string) {
        return this.metadata.careers[careerName]?.skills;
    }

    public getCertifications(careerName: string) {
        return this.metadata.careers[careerName]?.certifications;
    }

    public getGrowthOpportunities(careerName: string) {
        return this.metadata.careers[careerName]?.growth_opportunities;
    }

    public getSalaryRange(careerName: string) {
        return this.metadata.careers[careerName]?.salary_range;
    }

    // Method to update metadata (can be used by admin panel)
    public async updateCareerMetadata(careerName: string, updates: Partial<CareerMetadata['careers'][string]>) {
        // In a real application, this would update the JSON file or database
        this.metadata.careers[careerName] = {
            ...this.metadata.careers[careerName],
            ...updates
        };
    }
} 