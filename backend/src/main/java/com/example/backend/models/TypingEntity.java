package com.example.backend.models;

import com.example.backend.repositories.TypingRepo;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Entity
@Table(name = "typing_words")
public class TypingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", unique = true, nullable = false)
    private Long id;

    @Column(name = "word", nullable = false)
    private String word;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }


}

@Component
class TypingEntityLoader implements CommandLineRunner {

    @Autowired
    TypingRepo typingRepo;

    /**
     *
     * creates default user with id=1, username=user@user.at, password=user1234
     */
    @Override
    public void run(String... args) {
        if (typingRepo.findAll().isEmpty()) {
            String[] wordlist = {"and", "but", "cat", "dog", "run", "fun", "hop", "top", "hat", "eat",
                    "pat", "rat", "bit", "sit", "map", "lip", "cap", "lap", "pen", "hen",
                    "gem", "sun", "one", "two", "red", "led", "fog", "jog", "bug", "mug",
                    "dig", "pig", "jog", "log", "zap", "yap", "nap", "sap", "dad", "add",
                    "ice", "ace", "den", "men", "wet", "jet", "hit", "pit", "lot", "dot",
                    "rot", "cut", "hut", "nut", "bun", "fun", "mud", "bud", "hot", "dot",
                    "pot", "got", "jog", "jog", "box", "fox", "mix", "fix", "bag", "rag",
                    "tag", "jam", "ram", "dam", "ham", "jar", "car", "bar", "tar", "par",
                    "bat", "rat", "fat", "cat", "hat", "mat", "pat", "sat", "vat", "bet",
                    "pet", "get", "set", "jet", "let", "met", "net", "wet", "yet", "hum",
                    "gum", "sum", "rum", "bum", "run", "sun", "fun", "bun", "nun", "gun"};
            String word;
            for(int i = 0; i < wordlist.length; i++) {
                word = wordlist[i];
                TypingEntity entity = new TypingEntity();
                entity.setWord(word);
                typingRepo.save(entity);
            }
        }

    }
}
