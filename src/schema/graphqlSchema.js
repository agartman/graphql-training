export const PeopleSchemaGraphQL = `
    type People{
        """
        The mass of this person in kilograms.
        """
        mass: String,

        """
        The hair color of this person.
        """
        hair_color: String,
        
        """
        The url of this resource
        """
        url: String,

        """
        the ISO 8601 date format of the time that this resource was edited.
        """
        edited: String,
        
        """
        The ISO 8601 date format of the time that this resource was created.
        """
        created: String,
        
        """
        An array of urls of film resources that this person has been in.
        """
        films: [String],
        
        """
        The eye color of this person.
        """
        eye_color: String,

        """
        The height of this person in meters.
        """
        height: String,
        
        """
        The gender of this person (if known).
        """
        gender: String,
        
        """
        The mass of this person in kilograms.
        """
        homeworld: String,
        
        """
        The name of this person.
        """
        name: String,
        
        """
        An array of vehicle resources that this person has piloted
        """
        vehicles: [String],
        
        """
        An array of starship resources that this person has piloted
        """
        starships: [String],
        
        """
        The birth year of this person. BBY (Before the Battle of Yavin) or ABY (After the Battle of Yavin).
        """
        birth_year: String,
        
        """
        The skin color of this person.
        """
        skin_color: String,

        """
        The url of the species resource that this person is.
        """
        species: [String]
      }
      `
