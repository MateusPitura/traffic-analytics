export interface CreateClientDTO {
  name: string;
  color: string;
  observations: string;
}

export interface UpdateClientDTO {
  name?: string;
  color?: string;
  observations?: string;
}