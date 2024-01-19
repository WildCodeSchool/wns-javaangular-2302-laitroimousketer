import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class FormInput {
  static Widget defaultInput({
    required TextEditingController controller,
    String? hint,
    required String label,
    bool isPassword = false,
    bool obscureText = false, // Ajout du paramètre pour gérer le texte caché (par défaut à false)
    TextInputType keyboardType = TextInputType.text, // Ajout du paramètre pour spécifier le type de clavier (par défaut à TextInputType.text)
    RegExp? regex,
    void Function(bool)? onTogglePassword
  }) {
    return TextFormField(
      controller: controller,
      decoration: InputDecoration(
        labelText: label,
        hintText: hint ?? "",
        suffixIcon: isPassword
            ? IconButton(
          onPressed: () {
            if (onTogglePassword != null) {
              onTogglePassword(!obscureText);
            }
          },
          icon: Icon(obscureText ? Icons.visibility : Icons.visibility_off),
        )
            : null,
      ),
      obscureText: obscureText,
      keyboardType: keyboardType,
      validator: (value) {
        if (value == null || value.isEmpty) {
          return 'Ce champ ne peut pas être vide.';
        }
        if (regex != null && !regex.hasMatch(value)) {
          return 'Format invalide.';
        }
        return null;
      },
    );
  }


}