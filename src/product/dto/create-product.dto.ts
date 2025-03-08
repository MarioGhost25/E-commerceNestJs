export class CreateProductDto {
  id: number;
  name: string;
  description: string;
  constructor(id: number, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  static create(object: { [key: string]: any }): [string, CreateProductDto] {
    const { id, name, description } = object;

    // if (!id) return ['id is required', null];
    // if (!name) return ['name is required', null];
    // if (!description) return ['description is required', null];

    return ['', new CreateProductDto(id, name, description)];
  }
}
