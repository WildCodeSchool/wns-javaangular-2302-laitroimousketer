package wcs.backend.dtos;

import java.util.HashMap;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StatusDto {

private Map<String, String> statusMap = new HashMap<>();

public void addStatus(String key, String value) {
  statusMap.put(key, value);
}
}
